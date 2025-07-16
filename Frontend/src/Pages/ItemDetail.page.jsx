// src/Pages/ItemDetail.page.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';
import { ArrowLeft, Tag, Layers, Package, Award, Sparkles, User, Shield, CheckCircle, MessageCircle, CornerUpLeft, CornerUpRight } from 'lucide-react'; // Import necessary icons

function ItemDetailPage() {
    const { itemId } = useParams();
    const navigate = useNavigate();
    const { user, isAuthenticated, updateUserPoints } = useAuth();

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mainImage, setMainImage] = useState('');

    // States for Actions
    const [selectedAction, setSelectedAction] = useState(null); // 'redeem' or 'swap'
    const [isProcessingAction, setIsProcessingAction] = useState(false);

    // States for Swap Request UI
    const [userSwapItems, setUserSwapItems] = useState([]);
    const [loadingUserSwapItems, setLoadingUserSwapItems] = useState(false);
    const [selectedSwapItem, setSelectedSwapItem] = useState(null);


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

    // Fetch user's approved swap items when the user is authenticated
    useEffect(() => {
        if (isAuthenticated) {
            const fetchUserSwapItems = async () => {
                setLoadingUserSwapItems(true);
                try {
                    const response = await api.get('/user/my-swap-items');
                    if (response.data.success) {
                        setUserSwapItems(response.data.data);
                    }
                } catch (error) {
                    toast.error("Failed to fetch your swap items.");
                } finally {
                    setLoadingUserSwapItems(false);
                }
            };
            fetchUserSwapItems();
        }
    }, [isAuthenticated]); // Fetch when authentication status changes


    const handleRedeem = async () => {
        if (!isAuthenticated) {
            toast.info("Please log in to redeem items.");
            navigate('/login');
            return;
        }
        if (user._id === item.uploader.userId._id) {
             toast.error("You cannot redeem your own item.");
             return;
        }
        if (user.points < item.pointsValue) {
            toast.error("You don't have enough points to redeem this item.");
            return;
        }
        setIsProcessingAction(true);
        try {
            const response = await api.post(`/items/redeem/${itemId}`);
             if (response.data.success) {
                 toast.success("Item redeemed successfully!");
                 // Update points in AuthContext
                 updateUserPoints(response.data.data.newPoints);
                 // Navigate to dashboard after successful redemption
                 navigate('/user');
             } else {
                 toast.error(response.data.message || "Redemption failed.");
             }
        } catch (error) {
            toast.error(error.response?.data?.message || "Redemption failed.");
        } finally {
            setIsProcessingAction(false);
        }
    };

     const handleInitiateSwap = () => {
         if (!isAuthenticated) {
            toast.info("Please log in to make a swap request.");
            navigate('/login');
            return;
        }
        if (user._id === item.uploader.userId._id) {
             toast.error("You cannot swap for your own item.");
             return;
        }
        setSelectedAction('swap'); // Show the swap request UI
     };

    const handleSendSwapRequest = async () => {
        if (!selectedSwapItem) {
             toast.error("Please select an item to offer for the swap.");
             return;
        }
        setIsProcessingAction(true);
        try {
            const response = await api.post('/swap/request', {
                receiverItemId: item._id, // The item the current user wants
                requesterItemId: selectedSwapItem._id // The item the current user offers
            });
            if (response.data.success) {
                 toast.success("Swap request sent!");
                 // Navigate to dashboard or a dedicated swap requests page
                 navigate('/user');
             } else {
                 toast.error(response.data.message || "Failed to send swap request.");
             }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send swap request.");
        } finally {
            setIsProcessingAction(false);
        }
    };

    const isOwner = isAuthenticated && user?._id === item?.uploader?.userId?._id;
     // Check if item is available for action (approved status)
    const isItemAvailableForAction = item?.status === 'approved';
    const canRedeem = isAuthenticated && !isOwner && isItemAvailableForAction && item?.listingType === 'redeem' && user?.points >= item?.pointsValue;
    const canSwap = isAuthenticated && !isOwner && isItemAvailableForAction && item?.listingType === 'swap';


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

    // Conditional rendering for different views (Item Detail vs. Swap Request Form)
    if (selectedAction === 'swap' && isAuthenticated && !isOwner && isItemAvailableForAction) {
        // Render the Swap Request Form
        return (
            <div className="bg-gray-50 min-h-full p-4 md:p-8">
                <div className="max-w-4xl mx-auto">
                    <button onClick={() => setSelectedAction(null)} className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 font-medium mb-6">
                        <ArrowLeft size={20} /> Back to Item
                    </button>
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Propose a Swap</h1>
                        {/* Items involved */}
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-8">
                           {/* Item Being Requested */}
                           <div className="border border-gray-200 rounded-lg p-4 flex items-center space-x-4 bg-gray-50">
                              <CornerUpRight className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                              <img
                                  src={`http://localhost:8000${item.images[0]}`}
                                  alt={item.name}
                                  className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                              />
                              <div>
                                 <p className="font-medium text-gray-900">You want:</p>
                                 <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
                              </div>
                           </div>

                           {/* Item You Offer */}
                           <div className="border border-gray-200 rounded-lg p-4 flex items-center space-x-4 bg-gray-50">
                               <CornerUpLeft className="w-6 h-6 text-blue-600 flex-shrink-0" />
                                {selectedSwapItem ? (
                                   <>
                                       <img
                                           src={`http://localhost:8000${selectedSwapItem.images[0]}`}
                                           alt={selectedSwapItem.name}
                                           className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                                       />
                                       <div>
                                           <p className="font-medium text-gray-900">You offer:</p>
                                           <h4 className="text-lg font-semibold text-gray-800">{selectedSwapItem.name}</h4>
                                       </div>
                                   </>
                                ) : (
                                   <div className="text-gray-500 italic">Select an item below</div>
                                )}
                           </div>
                        </div>

                        {/* Select your item */}
                        <div className="bg-gray-50 rounded-xl p-6 mb-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Approved Swap Items to Offer</h3>
                             {loadingUserSwapItems ? (
                                 <div className="text-center text-gray-500">Loading your items...</div>
                             ) : userSwapItems.length > 0 ? (
                                 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                     {userSwapItems.map(userItem => (
                                         <div
                                             key={userItem._id}
                                             className={`relative border rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ease-in-out ${selectedSwapItem?._id === userItem._id ? 'border-emerald-500 ring-2 ring-emerald-500' : 'border-gray-200 hover:border-gray-300'}`}
                                             onClick={() => setSelectedSwapItem(userItem)}
                                         >
                                             <img src={`http://localhost:8000${userItem.images[0]}`} alt={userItem.name} className="w-full h-24 object-cover"/>
                                             <div className="p-2 text-center text-sm font-medium text-gray-800 truncate">{userItem.name}</div>
                                              {selectedSwapItem?._id === userItem._id && (
                                                  <div className="absolute top-1 right-1 bg-emerald-500 rounded-full p-0.5"><CheckCircle size={16} className="text-white" /></div>
                                              )}
                                         </div>
                                     ))}
                                 </div>
                             ) : (
                                 <p className="text-center text-gray-500">You have no approved items available for swap.</p>
                             )}
                        </div>
                        {/* Send Request Button */}
                        <button
                             onClick={handleSendSwapRequest}
                             disabled={!selectedSwapItem || isProcessingAction}
                             className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400"
                         >
                             {isProcessingAction ? 'Sending Request...' : <><MessageCircle size={20} /> Send Swap Request</>}
                         </button>
                    </div>
                </div>
            </div>
        );
    }


    // Default rendering: Item Detail View
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
                            <div className="flex items-center gap-3 text-gray-600"><Layers size={20} className="text-emerald-500"/>Category: <span className="font-medium text-gray-800">{item.category?.main} / {item.category?.sub}</span></div> {/* Added optional chaining */}
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
                                    {/* Redeem Button */}
                                    {item.listingType === 'redeem' && (
                                        <button
                                            onClick={handleRedeem}
                                            disabled={!canRedeem || isProcessingAction}
                                            className={`w-full font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2
                                                ${canRedeem ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}
                                            `}
                                        >
                                            <Award size={20} />
                                            {isProcessingAction ? 'Redeeming...' : `Redeem for ${item.pointsValue} Points`}
                                        </button>
                                    )}
                                    {/* Swap Button */}
                                    {item.listingType === 'swap' && (
                                        <button
                                            onClick={handleInitiateSwap}
                                            disabled={!canSwap || isProcessingAction} // Disable if not available or processing
                                            className={`w-full font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 mt-4
                                                 ${canSwap ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}
                                            `}
                                        >
                                            <Sparkles size={20} /> {isProcessingAction ? 'Processing...' : 'Request a Swap'}
                                        </button>
                                    )}
                                     {/* Message if item is not available for action but user is not owner */}
                                     {!isOwner && !isItemAvailableForAction && (
                                         <div className="p-4 bg-gray-200 text-gray-800 rounded-lg text-center">
                                             This item is currently {item.status}. Actions are not available.
                                         </div>
                                     )}
                                     {/* Message if user is not authenticated */}
                                     {!isAuthenticated && (
                                         <div className="p-4 bg-yellow-100 text-yellow-800 rounded-lg text-center mt-4">
                                             <Link to="/login" className="font-semibold underline hover:text-yellow-900">Log in</Link> to redeem or swap this item.
                                         </div>
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
                                    <p className="font-bold text-gray-900">{item.uploader?.username}</p> {/* Added optional chaining */}
                                    <p className="text-sm text-gray-500">{item.uploader?.userId?.email}</p> {/* Added optional chaining */}
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