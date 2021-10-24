import React, { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { login, register } from "../services/firebase";

const UserContext = createContext();

export const UserContextProvider = ({children}) =>{
    const history = useHistory();

    const[loginError, setLoginError] = useState();
    const[user, setUser] = useState();
    const[isLoggingIn, setIsLoggingIn] = useState(false);

    useEffect(() => {
        setUser(sessionStorage.getItem('user'));
    }, [])

    const submitLogin = (email, password) => {
        setIsLoggingIn(true);
        login(email, password)
        .then((res) => {
            sessionStorage.setItem('user', res.email)
            setUser(res.email);
            history.push(process.env.PUBLIC_URL + "/");
            setLoginError();
            setIsLoggingIn(false);
        })
        .catch((err) => {
            setLoginError(`${err[0]}: ${err[1]}`);
            setIsLoggingIn(false);
        });
    }

    const checkUser = () => {
        const user = sessionStorage.getItem('user')
        if (user) {
            return(true);
        } else {
            return(false);
        };
    }


    const logout = () => {
        sessionStorage.removeItem('user');
        setUser();
        history.push(process.env.PUBLIC_URL + '/login');
    }

    const submitRegister = (email, password) => {
        setIsLoggingIn(true);
        register(email, password)
        .then((res) => {
            sessionStorage.setItem('user', res.email)
            setUser(res.email);
            history.push(process.env.PUBLIC_URL + "/");
            setLoginError();
            setIsLoggingIn(false);
        })
        .catch((err) => {
            setLoginError(`${err[0]}: ${err[1]}`);
            setIsLoggingIn(false);
        });
    }

    return(
        <UserContext.Provider
            value={{
                loginError,
                submitLogin,
                checkUser,
                logout,
                user,
                isLoggingIn,
                submitRegister
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;