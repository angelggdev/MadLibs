import React, { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { login } from "../services/firebase";

const UserContext = createContext();

export const UserContextProvider = ({children}) =>{
    const history = useHistory();

    const[loginError, setLoginError] = useState();
    const[user, setUser] = useState();

    useEffect(() => {
        setUser(sessionStorage.getItem('user'));
    }, [])

    const submitLogin = (email, password) => {
        login(email, password)
        .then((res) => {
            sessionStorage.setItem('user', res.email)
            setUser(res.email);
            history.push("/");
            setLoginError();
        })
        .catch((err) => {
            setLoginError(`${err[0]}: ${err[1]}`)
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
        history.push('/login');
    }

    return(
        <UserContext.Provider
            value={{
                loginError,
                submitLogin,
                checkUser,
                logout,
                user
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;