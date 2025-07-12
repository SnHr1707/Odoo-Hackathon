// src/Pages/User.page.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import useAuth from '../hooks/useAuth';
import UserDashboard from '../components/User';
import { toast } from 'react-toastify';

const UserPage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await api.get('/user/dashboard');
                if (response.data.success) {
                    setDashboardData(response.data.data);
                }
            } catch (error) {
                toast.error("Could not fetch dashboard data.");
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchDashboardData();
        }
    }, [user]);

    const handleNavigateToListing = () => {
        navigate('/add-item');
    };

    if (loading) {
        return <div className="text-center py-10">Loading Dashboard...</div>;
    }

    if (!dashboardData) {
        return <div className="text-center py-10">Could not load dashboard data.</div>;
    }

    return (
        <UserDashboard
            dashboardData={dashboardData}
            onNavigateToListing={handleNavigateToListing}
            onLogout={logout}
        />
    );
};

export default UserPage;