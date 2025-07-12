// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-toastify';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // This will now work correctly

    const verifyAuth = useCallback(async () => {
        try {
            const response = await api.get('/auth/user/profile');
            if (response.data.success) {
                setUser(response.data.data.user);
                setIsAuthenticated(true);
            }
        } catch (error) {
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        verifyAuth();
    }, [verifyAuth]);

    const login = (userData) => {
        setUser(userData);
        setIsAuthenticated(true);
    };

    const logout = async () => {
        try {
            await api.post('/auth/user/logout');
            setUser(null);
            setIsAuthenticated(false);
            toast.success("Logged out successfully.");
            navigate('/login');
        } catch (error) {
            toast.error("Logout failed. Please try again.");
        }
    };
    
    const updateUserPoints = (newPoints) => {
        if(user){
            setUser(prevUser => ({...prevUser, points: newPoints}));
        }
    };

    const value = { 
        user, 
        isAuthenticated, 
        loading, 
        login, 
        logout, 
        updateUserPoints,
        isAdmin: user?.role === 'admin',
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};