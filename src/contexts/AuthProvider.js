import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { AuthContext } from './authContext';
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);
    return (_jsx(AuthContext.Provider, { value: { isAuthenticated, login, logout }, children: children }));
};
