import React, {useContext} from 'react';
import {Switch, Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import Profile from './pages/Profile';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import './App.css';
import {AuthContext} from "./context/AuthContext";

function App() {
    const { isAuth } = useContext(AuthContext);
    return (
        <>
            <NavBar/>
            <div className="content">
                <Route exact path="/">
                    <Home/>
                </Route>
                <Switch>
                  {isAuth && <Route path="/profile">
                    <Profile/>
                  </Route>}

                    <Route path="/signin">
                        <SignIn/>
                    </Route>
                    <Route path="/signup">
                        <SignUp/>
                    </Route>
                </Switch>
            </div>
        </>
    );
}

export default App;
