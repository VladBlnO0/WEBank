import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState(null);

    const login = (username, password) => {
        if (username === "admin" && password === "admin") {
            setIsAdmin(true);
            setUser("admin");
            return "admin";
        }asd
        if (username === "user" && password === "user") {
            setIsAdmin(false);
            setUser("user");
            return "user";
        } else {
            alert("Невірні дані");
        }
    };

    const logout = () => {
        setUser(null);
        setIsAdmin(false);
    };

    return <AuthContext.Provider value={{ isAdmin, user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
