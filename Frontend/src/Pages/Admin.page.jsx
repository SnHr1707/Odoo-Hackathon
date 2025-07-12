// src/Pages/Admin.page.jsx
import React, { useState, useEffect, useCallback } from 'react';
import api from '../api/axios';
import { toast } from 'react-toastify';
import { Shield, CheckCircle, XCircle, Clock, UserCheck, UserPlus, LogOut } from 'lucide-react';
import useAuth from '../hooks/useAuth';

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('items');
    const [pendingItems, setPendingItems] = useState([]);
    const [pendingAdmins, setPendingAdmins] = useState([]);
    const [loadingItems, setLoadingItems] = useState(true);
    const [loadingAdmins, setLoadingAdmins] = useState(true);
    const { logout } = useAuth();

    const fetchPendingItems = useCallback(async () => {
        setLoadingItems(true);
        try {
            const response = await api.get('/admin/items/pending');
            if (response.data.success) {
                setPendingItems(response.data.data);
            }
        } catch (error) {
            toast.error("Failed to fetch pending items.");
        } finally {
            setLoadingItems(false);
        }
    }, []);

    const fetchPendingAdmins = useCallback(async () => {
        setLoadingAdmins(true);
        try {
            const response = await api.get('/admin/pending-admins');
            if (response.data.success) {
                setPendingAdmins(response.data.data);
            }
        } catch (error) {
            toast.error("Failed to fetch pending admin requests.");
        } finally {
            setLoadingAdmins(false);
        }
    }, []);

    useEffect(() => {
        if (activeTab === 'items') {
            fetchPendingItems();
        } else if (activeTab === 'admins') {
            fetchPendingAdmins();
        }
    }, [activeTab, fetchPendingItems, fetchPendingAdmins]);

    const handleModerateItem = async (itemId, action) => {
        try {
            let reason = '';
            if (action === 'reject') {
                reason = prompt("Please provide a reason for rejecting this item:");
                if (reason === null) return; // User cancelled the prompt
            }
            await api.patch(`/admin/items/moderate/${itemId}`, { action, rejectionReason: reason });
            toast.success(`Item has been ${action}ed.`);
            setPendingItems(prev => prev.filter(item => item._id !== itemId));
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to moderate item.");
        }
    };

    const handleApproveAdmin = async (adminId) => {
        try {
            await api.patch(`/admin/approve-admin/${adminId}`);
            toast.success("Admin account approved successfully.");
            setPendingAdmins(prev => prev.filter(admin => admin._id !== adminId));
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to approve admin.");
        }
    };

    const renderItemModeration = () => (
        <div className="space-y-4">
            {loadingItems ? <p>Loading pending items...</p> :
             pendingItems.length > 0 ? pendingItems.map(item => (
                <div key={item._id} className="bg-white p-4 rounded-lg shadow-md border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                        {/* Display Base64 Image */}
                        <img src={item.images[0]} alt={item.name} className="w-20 h-20 object-cover rounded-md"/>
                        <div>
                            <h3 className="font-bold text-lg">{item.name}</h3>
                            <p className="text-sm text-gray-600">by {item.uploader?.username || 'N/A'}</p>
                            <p className="text-sm text-gray-500 mt-1">Listed on: {new Date(item.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 self-end md:self-center">
                        <button onClick={() => handleModerateItem(item._id, 'approve')} className="p-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600"><CheckCircle size={20}/></button>
                        <button onClick={() => handleModerateItem(item._id, 'reject')} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"><XCircle size={20}/></button>
                    </div>
                </div>
             )) : <p className="text-center text-gray-500 py-8">No items are currently pending approval.</p>
            }
        </div>
    );

    const renderAdminManagement = () => (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md border">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Clock/> Pending Admin Approvals</h3>
                {loadingAdmins ? <p>Loading pending admins...</p> :
                 pendingAdmins.length > 0 ? (
                    <div className="space-y-4">
                        {pendingAdmins.map(admin => (
                            <div key={admin._id} className="bg-gray-50 p-4 rounded-lg border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                <div>
                                    <h4 className="font-bold text-gray-900">{admin.username}</h4>
                                    <p className="text-sm text-gray-600">{admin.email}</p>
                                    <p className="text-xs text-gray-500 mt-1">Registered: {new Date(admin.createdAt).toLocaleString()}</p>
                                </div>
                                <button onClick={() => handleApproveAdmin(admin._id)} className="bg-emerald-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-600 self-end sm:self-center">
                                    <UserCheck size={16}/>Approve
                                </button>
                            </div>
                        ))}
                    </div>
                 ) : <p className="text-center text-gray-500 py-8">No new admins are awaiting approval.</p>
                }
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-gray-800 text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Shield size={28} />
                        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                    </div>
                    <button onClick={logout} className="bg-red-600 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700">
                        <LogOut size={16}/>Logout
                    </button>
                </div>
            </header>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex border-b border-gray-300 mb-6">
                    <button onClick={() => setActiveTab('items')} className={`px-6 py-3 text-lg font-medium ${activeTab === 'items' ? 'border-b-2 border-gray-800 text-gray-800' : 'text-gray-500'}`}>Item Moderation ({pendingItems.length})</button>
                    <button onClick={() => setActiveTab('admins')} className={`px-6 py-3 text-lg font-medium ${activeTab === 'admins' ? 'border-b-2 border-gray-800 text-gray-800' : 'text-gray-500'}`}>Admin Management ({pendingAdmins.length})</button>
                </div>
                <div>
                    {activeTab === 'items' && renderItemModeration()}
                    {activeTab === 'admins' && renderAdminManagement()}
                </div>
            </main>
        </div>
    );
};

export default AdminPage;