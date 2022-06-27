import React, {createContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({ children }){
    const [isAuth, setAuth] = useState({
        isAuth: false,
        users: null,
        status: 'pending'
    });

    const history = useHistory();

    function login(jwt){
        console.log("gebruiker is ingelogd");
        localStorage.setItem('token', jwt);
        const decodedToken = jwtDecode(jwt);
        setAuth({
            ...isAuth,
            isAuth: true,
            users: {
                email: decodedToken.email,
                sub: decodedToken.sub,
            },
            status: 'done',
        });
        history.push("/profile");
    }

    function notLogin(){
        console.log("gebruiker is uitgelogd");
        setAuth({
            isAuth: false,
            users: null,
            status: 'done'
        });
        history.push("/");
        console.log(isAuth);
    }

            useEffect(()=>{
                const token = localStorage.getItem('token');

                if (token){
                    async function getData(){
                        const decodedToken = jwtDecode(token);
                        try{
                            const response = await axios.get(`http://localhost:3000/600/users/${decodedToken.sub}`,{
                                headers:{
                                    'Content-type': 'application/json',
                                    Authorization: `Bearer ${token}`
                                }
                            })
                            setAuth({
                                isAuth: true,
                                user: {
                                    email: response.data.email,
                                    username: response.data.username,
                                    id: response.data.id,
                                },
                                status: 'done',
                            });
                        }catch (e) {
                            setAuth({
                                ...isAuth,
                                status: 'error',
                            });
                            console.error(e);
                        }
                    }
                    getData();
                }else {
                    setAuth({
                        ...isAuth,
                        status: 'done',
                    });
                }
            },[])

    const data = {
        isAuth: isAuth.isAuth,
        users: isAuth.users,
        login: login,
        notLogin: notLogin,
    }

    return(
        <AuthContext.Provider value={data}>
            { isAuth.status === 'done' ? children : <p>Loading...</p> }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;