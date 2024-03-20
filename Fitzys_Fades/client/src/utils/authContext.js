import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService from './auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const authService = new AuthService();
    const [isLoggedIn, setIsLoggedIn] = useState(authService.loggedIn());

    useEffect(() => {
        // Check auth state on mount
        setIsLoggedIn(authService.loggedIn());
    }, []);

    const login = (idToken) => {
        authService.login(idToken);
        setIsLoggedIn(true);
    };

    const logout = () => {
        authService.logout();
        setIsLoggedIn(false);
    };

    const getProfile = () => {
        return authService.getProfile();
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, getProfile }}>
            {children}
        </AuthContext.Provider>
    );
};
