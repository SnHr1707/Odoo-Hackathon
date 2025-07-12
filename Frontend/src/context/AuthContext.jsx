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
    const navigate = useNavigate();

    const verifyAuth = useCallback(async () => {
        try {
            // Try to verify a user first
            const response = await api.get('/auth/user/profile');
            if (response.data.success) {
                setUser(response.data.data.user);
                setIsAuthenticated(true);
            }
        } catch (error) {
            // If user verification fails, it might be an admin or no one
            // We'll just clear state for now. Admins will re-auth on login.
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
            // Use the correct logout endpoint based on role
            const endpoint = user?.role === 'admin' ? '/auth/admin/logout' : '/auth/user/logout';
            await api.post(endpoint);
            setUser(null);
            setIsAuthenticated(false);
            toast.success("Logged out successfully.");
            navigate('/login');
        } catch (error) {
            toast.error("Logout failed. Please try again.");
            // Force clear frontend state even if backend fails
            setUser(null);
            setIsAuthenticated(false);
            navigate('/login');
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
        // isAdmin check is now more robust
        isAdmin: isAuthenticated && user?.role === 'admin',
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};