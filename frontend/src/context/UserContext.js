import React, {createContext, useContext, useEffect, useState} from "react";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [userId, setUserId] = useState(() => localStorage.getItem('userId') || '');
    const [token, setToken] = useState(() => localStorage.getItem('token') || '');

    useEffect(() => {
        if(userId) { 
            localStorage.setItem('userId', userId);
        } else {
            localStorage.removeItem('userId')
        }
    });

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    return (
        <UserContext.Provider value={{userId, setUserId, token, setToken}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);