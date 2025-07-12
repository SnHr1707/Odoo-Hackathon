// src/Pages/ItemDetail.page.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';
import { ArrowLeft, Tag, Layers, Package, Award, Sparkles, User, Shield } from 'lucide-react';

function ItemDetailPage() {
    const { itemId } = useParams();
    const navigate = useNavigate();
    const { user, isAuthenticated, updateUserPoints } = useAuth();

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isRedeeming, setIsRedeeming] = useState(false);
    const [mainImage, setMainImage] = useState('');

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await api.get(`/items/${itemId}`);
                if (response.data && response.data.success) {
                    setItem(response.data.data);
                    setMainImage(response.data.data.images[0]);
                }
            } catch (error) {
                toast.error("Failed to fetch item details.");
                navigate('/home');
            } finally {
                setLoading(false);
            }
        };
        fetchItem();
    }, [itemId, navigate]);

    const handleRedeem = async () => {
        if (!isAuthenticated) {
            toast.info("Please log in to redeem items.");
            navigate('/login');
            return;
        }
        if (user.points < item.pointsValue) {
            toast.error("You don't have enough points to redeem this item.");
            return;
        }
        setIsRedeeming(true);
        try {
            await api.post(`/items/redeem/${itemId}`);
            toast.success("Item redeemed successfully!");
            updateUserPoints(user.points - item.pointsValue);
            navigate('/user');
        } catch (error) {
            toast.error(error.response?.data?.message || "Redemption failed.");
        } finally {
            setIsRedeeming(false);
        }
    };
    
    const handleSwapRequest = () => {
        if (!isAuthenticated) {
            toast.info("Please log in to make a swap request.");
            navigate('/login');
            return;
        }
        // Navigate to a swap initiation page or open a modal
        toast.info("Swap functionality coming soon!");
        // Example: navigate(`/swap/request?itemId=${item._id}`);
    };


    if (loading) {
        return <div className="text-center p-10">Loading Item...</div>;
    }

    if (!item) {
        return (
            <div className="text-center p-10">
                <h2 className="text-2xl font-bold">Item Not Found</h2>
                <button onClick={() => navigate('/home')} className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-lg">Go to Home</button>
            </div>
        );
    }

    const isOwner = isAuthenticated && user._id === item.uploader.userId._id;

    return (
        <div className="bg-gray-50 min-h-full p-4 md:p-8">
             <div className="max-w-7xl mx-auto">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 font-medium mb-6">
                    <ArrowLeft size={20} /> Back
                </button>
                <div className="bg-white p-6 rounded-2xl shadow-lg grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Image Gallery */}
                    <div className="flex flex-col gap-4">
                        <div className="aspect-square w-full bg-gray-100 rounded-xl overflow-hidden">
                             <img src={`http://localhost:8000${mainImage}`} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="grid grid-cols-5 gap-2">
                            {item.images.map((img, index) => (
                                <div key={index} 
                                     className={`aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer border-2 ${mainImage === img ? 'border-emerald-500' : 'border-transparent'}`}
                                     onClick={() => setMainImage(img)}>
                                    <img src={`http://localhost:8000${img}`} alt={`${item.name} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Item Details */}
                    <div>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${item.listingType === 'redeem' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
                            {item.listingType === 'redeem' ? `Redeemable for ${item.pointsValue} Points` : 'Available for Swap'}
                        </span>
                        <h1 className="text-4xl font-bold text-gray-900">{item.name}</h1>
                        <p className="text-lg text-gray-500 mt-2">by <span className="font-semibold text-gray-700">{item.brand}</span></p>

                        <div className="mt-6 border-t pt-6">
                             <p className="text-gray-700 whitespace-pre-wrap">{item.description}</p>
                        </div>
                        
                        <div className="mt-6 space-y-3">
                            <div className="flex items-center gap-3 text-gray-600"><Layers size={20} className="text-emerald-500"/>Category: <span className="font-medium text-gray-800">{item.category.main} / {item.category.sub}</span></div>
                            <div className="flex items-center gap-3 text-gray-600"><Package size={20} className="text-emerald-500"/>Status: <span className="font-medium text-gray-800 capitalize">{item.status}</span></div>
                            {item.tags.length > 0 && (
                                <div className="flex items-start gap-3 text-gray-600">
                                    <Tag size={20} className="text-emerald-500 mt-1"/>
                                    <div className="flex flex-wrap gap-2">
                                        {item.tags.map(tag => <span key={tag} className="bg-gray-100 px-2 py-1 text-xs rounded-md">{tag}</span>)}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-8">
                             {isOwner ? (
                                <div className="p-4 bg-blue-50 text-blue-700 rounded-lg text-center">This is your item.</div>
                             ) : (
                                <>
                                    {item.listingType === 'redeem' && (
                                        <button 
                                            onClick={handleRedeem} 
                                            disabled={isRedeeming || item.status !== 'approved'}
                                            className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400">
                                            <Award size={20} /> {isRedeeming ? 'Redeeming...' : `Redeem for ${item.pointsValue} Points`}
                                        </button>
                                    )}
                                    {item.listingType === 'swap' && (
                                        <button 
                                            onClick={handleSwapRequest} 
                                            disabled={item.status !== 'approved'}
                                            className="w-full bg-orange-500 text-white font-bold py-4 rounded-xl hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400">
                                            <Sparkles size={20} /> Request a Swap
                                        </button>
                                    )}
                                </>
                             )}
                        </div>

                         {/* Uploader Info */}
                        <div className="mt-8 border-t pt-6">
                            <h3 className="font-semibold text-lg text-gray-800 mb-4">Uploader Information</h3>
                            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
                                <div className="w-12 h-12 bg-emerald-200 rounded-full flex items-center justify-center">
                                    <User size={24} className="text-emerald-700"/>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">{item.uploader.username}</p>
                                    <p className="text-sm text-gray-500">{item.uploader.userId.email}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
             </div>
        </div>
    );
}

export default ItemDetailPage;