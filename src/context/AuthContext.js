import React, {createContext, useState} from "react";
import {useHistory} from "react-router-dom";

export const AuthContext = createContext({});

function AuthContextProvider({ children }){
    const [isAuth, setAuth] = useState(false);
    const history = useHistory();
    function login(){
        setAuth(true)
        console.log("gebruiker is ingelogd")
        history.push("/profile")

    }

    function notLogin(){
        console.log("gebruiker is uitgelogd")
        setAuth(false)
        history.push("/")

    }

    const data = {
        isAuth: isAuth,
        login: login,
        notLogin: notLogin,
    }

    return(
        <AuthContext.Provider value={data}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;