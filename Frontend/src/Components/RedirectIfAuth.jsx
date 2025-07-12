// src/components/RedirectIfAuth.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RedirectIfAuth = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Or a loading spinner
    }

    return isAuthenticated ? <Navigate to="/user" replace /> : <Outlet />;
};

export default RedirectIfAuth;