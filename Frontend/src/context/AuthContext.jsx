// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setToken(storedToken);
                setUser(parsedUser);
                setIsAuthenticated(true);
                if (parsedUser.role === 'admin') {
                    setIsAdmin(true);
                }
            } catch (error) {
                console.error("Failed to parse user from localStorage", error);
                logout();
            }
        }
        setLoading(false);
    }, []);

    const login = (userData, userToken) => {
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', userToken);
        setUser(userData);
        setToken(userToken);
        setIsAuthenticated(true);
        if (userData.role === 'admin') {
            setIsAdmin(true);
        }
    };

    const logout = async () => {
        try {
            // It's good practice to inform the backend even if the token will expire
            if (token) {
                await api.post('/auth/user/logout');
            }
        } catch (error) {
            console.error("Logout failed on server, clearing client session.", error);
        } finally {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            setUser(null);
            setToken(null);
            setIsAuthenticated(false);
            setIsAdmin(false);
        }
    };
    
    const updateUserPoints = (newPoints) => {
        if(user){
            const updatedUser = {...user, points: newPoints};
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
        }
    }

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated, isAdmin, loading, login, logout, updateUserPoints }}>
            {children}
        </AuthContext.Provider>
    );
};