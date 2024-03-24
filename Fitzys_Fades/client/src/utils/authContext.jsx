import { createContext, useContext, useState, useEffect } from 'react';
import AuthService from './auth';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const authService = new AuthService();
        const [authState, setAuthState] = useState({
        isLoggedIn: authService.loggedIn(),
        userProfile: authService.getProfile(),
    });

    useEffect(() => {
        // auth state on mount
       setAuthState({
            isLoggedIn: authService.loggedIn(),
            userProfile: authService.getProfile(),
        });
    }, []);

    const login = (idToken) => {
        authService.login(idToken);
        setAuthState({
            isLoggedIn: true,
            userProfile: authService.getProfile(),
        });
    };

    const logout = () => {
        authService.logout();
        setAuthState({
            isLoggedIn: false,
            userProfile: null,
        });
    };

    // const getProfile = () => {
    //     return authService.getProfile();
    // };

    return (
        <AuthContext.Provider value={{ ...authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// props validation
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { AuthContext };
