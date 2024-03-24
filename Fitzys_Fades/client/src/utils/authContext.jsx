import { createContext, useContext, useState, useEffect } from 'react';
import AuthService from './auth';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const authService = new AuthService();
        const [authState, setAuthState] = useState({
        isLoggedIn: false,
        userProfile: null,
    });

    useEffect(() => {
        const initializeAuthState = async () => {
            // Fetch initial authentication state
            const isLoggedIn = authService.loggedIn();
            const userProfile = authService.getProfile();
            
            // update authState
            setAuthState({
                isLoggedIn,
                userProfile,
            });
        };
        
        initializeAuthState();
    }, []);

    const login = async (idToken) => {
        authService.login(idToken); 
        const isLoggedIn = authService.loggedIn();
        const userProfile = authService.getProfile();
        setAuthState({
            isLoggedIn,
            userProfile,
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
