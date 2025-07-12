import React, { useState } from 'react';
import {
  ArrowLeft,
  Shirt,
  MapPin,
  Star,
  Eye,
  Heart,
  Tag,
  Award,
  MessageCircle,
  CheckCircle,
  Package,
  CornerUpLeft, // Icon for offer
  CornerUpRight // Icon for requested
} from 'lucide-react';

// --- Mock Data ---
// This mock data should ideally be managed in a higher-level state or context
// in a real application, but is kept here for standalone component demonstration.
const mockItemForActions = {
  id: 1,
  title: "Stylish Summer Dress",
  description: "A beautiful and lightweight summer dress, perfect for sunny days. Made from breathable cotton blend. Size Medium. Gently used, in excellent condition.",
  images: [
    "https://images.pexels.com/photos/1061588/pexels-photo-1061588.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600",
  ],
  status: "available", // Ensure status is available for actions
  points: 350, // Points value to redeem
  views: 150,
  likes: 35,
  dateListed: "2025-02-15",
  uploader: {
    name: "Sarah M.",
    location: "Nearby City, CA",
    rating: 4.7,
    swapsCompleted: 10,
    avatar: null
  }
};

const mockCurrentUserForActions = {
    id: 1,
    name: "Frontend User",
    points: 750, // Current points of the user
    // Items listed by the current user (for swap offers) - Mock data
    listedItems: [
        { id: 101, title: "Blue Jeans", image: "https://images.pexels.com/photos/884979/pexels-photo-884979.jpeg?auto=compress&cs=tinysrgb&w=300", status: "available" },
        { id: 102, title: "Red Scarf", image: "https://images.pexels.com/photos/7153441/pexels-photo-7153441.jpeg?auto=compress&cs=tinysrgb&w=300", status: "available" },
        { id: 103, title: "Leather Boots (Size 9)", image: "https://images.pexels.com/photos/1159670/pexels-photo-1159670.jpeg?auto=compress&cs=tinysrgb&w=300", status: "swapped" }, // Example of unavailable item
         { id: 104, title: "Vintage T-Shirt", image: "https://images.pexels.com/photos/1020737/pexels-photo-1020737.jpeg?auto=compress&cs=tinysrgb&w=300", status: "available" },
    ]
    // ... other user properties
};
// --- End Mock Data ---


// Helper function for status color (reused)
const getStatusColor = (status) => {
  switch (status) {
    case 'available': return 'bg-emerald-100 text-emerald-700';
    case 'swapped': return 'bg-gray-100 text-gray-700';
    case 'pending': return 'bg-yellow-100 text-yellow-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

// This component handles displaying the item details and switching between
// the "Redeem" and "Swap Request" interfaces.
const ItemActionSelectorPage = ({ item = mockItemForActions, user = mockCurrentUserForActions, onBackToListings }) => {
  // State to track the selected action: 'none', 'redeem', or 'swap'
  const [selectedAction, setSelectedAction] = useState('none');

  // State for the Redeem view
  const [redeeming, setRedeeming] = useState(false);
  const [redeemSuccess, setRedeemSuccess] = useState(false);
  const [redeemError, setRedeemError] = useState(null);

  // State for the Swap Request view
  const [selectedSwapItem, setSelectedSwapItem] = useState(null); // Item the user offers
  const [swapMessage, setSwapMessage] = useState('');
  const [sendingSwapRequest, setSendingSwapRequest] = useState(false);
  const [swapRequestSuccess, setSwapRequestSuccess] = useState(false);
  const [swapRequestError, setSwapRequestError] = useState(null);


  // --- Redeem Logic ---
  const canRedeem = user.points >= item.points;

  const handleRedeem = async () => {
    if (!canRedeem || redeeming || redeemSuccess) {
      return;
    }

    setRedeeming(true);
    setRedeemSuccess(false);
    setRedeemError(null);
    console.log(`Attempting to redeem "${item.title}" for ${item.points} points...`);

    // Simulate backend process
    await new Promise(resolve => setTimeout(resolve, 1500));
    const mockSuccess = true; // Change to false to simulate an error

    if (mockSuccess) {
        setRedeemSuccess(true);
        console.log("Redemption successful (frontend mock)");
        // In a real app, you'd update user points here
        // Example: setUserPoints(user.points - item.points); // Assumes user points are state in parent
    } else {
        setRedeemError("Simulated redemption failed.");
        console.error("Redemption failed (frontend mock)");
    }
    setRedeeming(false);
  };
  // --- End Redeem Logic ---

  // --- Swap Request Logic ---
  const availableSwapItems = user.listedItems.filter(userItem => userItem.status === 'available');
  const canSendSwapRequest = selectedSwapItem !== null && !sendingSwapRequest && !swapRequestSuccess;

  const handleSendSwapRequest = async () => {
    if (!canSendSwapRequest) {
        return;
    }

    setSendingSwapRequest(true);
    setSwapRequestSuccess(false);
    setSwapRequestError(null);
    console.log(`Sending swap request for "${item.title}" offering "${selectedSwapItem.title}"...`);

     // Simulate backend process
    await new Promise(resolve => setTimeout(resolve, 1500));
    const mockSuccess = true; // Change to false to simulate an error

     if (mockSuccess) {
        setSwapRequestSuccess(true);
        console.log("Swap request sent successfully (frontend mock)");
        // In a real app, you'd likely update the status of the involved items
    } else {
        setSwapRequestError("Simulated swap request failed.");
        console.error("Swap request failed (frontend mock)");
    }
    setSendingSwapRequest(false);
  };
  // --- End Swap Request Logic ---

  // If item is not available, show a message instead of actions on the initial view
   if (item.status !== 'available' && selectedAction === 'none') {
       return (
            <div className="min-h-screen bg-gray-50">
                 {/* Header */}
                <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                            <Shirt className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-900">ReWear</span>
                        </div>
                    </div>
                    </div>
                </header>
                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
                     <button
                        onClick={onBackToListings}
                        className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
                        >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back to Listings</span>
                    </button>
                    <div className={`bg-white rounded-2xl shadow-sm p-8 border border-gray-100 inline-block ${getStatusColor(item.status)}`}>
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">{item.title}</h1>
                        <p className="text-lg font-medium text-gray-700">
                            This item is currently <span className="font-bold">{item.status}</span>.
                        </p>
                        {/* You could add more details or actions here */}
                    </div>
                 </div>
            </div>
       );
   }


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                <Shirt className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">ReWear</span>
            </div>
             {/* Could add user info here */}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         {/* Back Button (visible unless on the initial action selection view) */}
        {selectedAction !== 'none' && (
             <button
                // Logic to go back: if successful redemption, clicking back goes to listings. Otherwise, back to action selection.
                onClick={() => selectedAction === 'redeem' && redeemSuccess ? onBackToListings() : setSelectedAction('none')}
                className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
             >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
             </button>
        )}


        {/* --- Initial Item View with Action Selection --- */}
        {selectedAction === 'none' && (
             <div className="grid lg:grid-cols-3 gap-8">
                 {/* Image Gallery (Simple Version) */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 p-4">
                       <img
                          src={item.images[0]} // Display first image for simplicity on this page
                          alt={item.title}
                          className="w-full h-96 object-cover rounded-lg"
                       />
                       {/* Could add image gallery thumbnails here if desired */}
                    </div>
                </div>

                {/* Item Details & Action Buttons */}
                <div className="lg:col-span-1 space-y-6">
                     <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                        <h1 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h1>
                        <div className="flex items-center space-x-2 mb-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                             <Package className="w-4 h-4 inline-block mr-1" /> {item.status}
                          </span>
                           <span className="text-sm text-gray-500 flex items-center space-x-1">
                             <Eye className="w-4 h-4" /> <span>{item.views} views</span>
                           </span>
                           <span className="text-sm text-gray-500 flex items-center space-x-1">
                             <Heart className="w-4 h-4" /> <span>{item.likes} likes</span>
                           </span>
                        </div>

                        <p className="text-gray-700 mb-6">{item.description}</p>

                        {/* Action Selection Buttons */}
                        {item.status === 'available' ? (
                           <div className="space-y-3">
                                <button
                                    onClick={() => setSelectedAction('swap')}
                                    className="w-full bg-emerald-500 text-white py-3 rounded-xl hover:bg-emerald-600 transition-colors flex items-center justify-center space-x-2 font-medium"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    <span>Request Swap</span>
                                </button>
                                {/* Only show redeem if points are set on the item */}
                                {item.points > 0 && (
                                    <button
                                        onClick={() => setSelectedAction('redeem')}
                                        className={`w-full border py-3 rounded-xl transition-colors flex items-center justify-center space-x-2 font-medium
                                           ${canRedeem
                                                ? 'border-emerald-500 text-emerald-600 bg-emerald-50 hover:bg-emerald-100'
                                                : 'border-gray-300 text-gray-500 bg-gray-100 cursor-not-allowed'
                                            }
                                        `}
                                        disabled={!canRedeem}
                                    >
                                        <Award className="w-5 h-5" />
                                        <span>Redeem for {item.points} points</span>
                                        {!canRedeem && <span className="text-xs ml-2">(Not Enough Points)</span>}
                                    </button>
                                )}
                           </div>
                        ) : (
                           <div className={`w-full text-center py-3 rounded-xl font-medium ${getStatusColor(item.status)}`}>
                             Item is {item.status}
                           </div>
                        )}
                     </div>

                     {/* Uploader Info Card */}
                    {item.uploader && (
                       <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">About the Uploader</h3>
                          <div className="flex items-center space-x-4">
                             <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex-shrink-0 flex items-center justify-center text-white font-medium">
                                {/* Placeholder for avatar */}
                                {item.uploader.avatar ? (
                                   <img src={item.uploader.avatar} alt={item.uploader.name} className="w-full h-full rounded-full object-cover" />
                                ) : (
                                   item.uploader.name.charAt(0)
                                )}
                             </div>
                             <div>
                               <p className="font-medium text-gray-900">{item.uploader.name}</p>
                                <p className="text-sm text-gray-500 flex items-center space-x-1 mt-1">
                                  <MapPin className="w-4 h-4" />
                                  <span>{item.uploader.location}</span>
                                </p>
                                 <div className="flex items-center space-x-1 mt-1">
                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                    <span className="text-sm font-medium text-gray-700">{item.uploader.rating}</span>
                                    <span className="text-sm text-gray-500">({item.uploader.swapsCompleted} swaps)</span>
                                 </div>
                             </div>
                          </div>
                       </div>
                    )}
                </div>
            </div>
        )}

        {/* --- Redeem with Points View --- */}
        {selectedAction === 'redeem' && (
             <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 max-w-xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Confirm Redemption</h2>

                 {redeemSuccess ? (
                     // Success Message View
                     <div className="text-center py-10">
                         <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                         <h3 className="text-xl font-semibold text-gray-900 mb-2">Redemption Successful!</h3>
                         <p className="text-gray-600 mb-6">You have successfully redeemed "{item.title}". Check your profile for details.</p>
                         <button
                             onClick={onBackToListings} // Option to go back to listings
                             className="bg-emerald-500 text-white px-6 py-3 rounded-xl hover:bg-emerald-600 transition-colors font-medium"
                         >
                             Back to Listings
                         </button>
                     </div>
                 ) : (
                    // Redemption Form/Summary View
                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <img
                                src={item.images[0]} // Display main image
                                alt={item.title}
                                className="w-24 h-24 object-cover rounded-lg border border-gray-200 flex-shrink-0"
                            />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                                <p className="text-gray-600 text-sm">{item.description.substring(0, 100)}...</p> {/* Truncate description */}
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                            <div className="flex items-center justify-between text-gray-700">
                                <span>Your Available Points:</span>
                                <span className="font-medium text-gray-900">{user.points} points</span>
                            </div>
                             <div className="flex items-center justify-between text-gray-700 border-b border-gray-200 pb-3">
                                <span>Item Cost:</span>
                                <span className="font-medium text-emerald-600">- {item.points} points</span>
                            </div>
                            <div className="flex items-center justify-between text-gray-900 font-bold text-lg">
                                <span>Points Remaining:</span>
                                <span>{canRedeem ? user.points - item.points : user.points} points</span>
                            </div>
                        </div>

                        {redeemError && (
                            <p className="text-red-600 text-center text-sm">{redeemError}</p>
                        )}

                        <button
                          onClick={handleRedeem}
                          className={`w-full py-3 rounded-xl transition-colors font-medium flex items-center justify-center space-x-2
                             ${canRedeem
                               ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                               : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                             }
                          `}
                          disabled={!canRedeem || redeeming}
                        >
                          {redeeming ? (
                              <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l2-2.647z"></path>
                                </svg>
                                <span>Redeeming...</span>
                              </>
                          ) : (
                              <>
                                <Award className="w-5 h-5" />
                                <span>{canRedeem ? 'Confirm Redemption' : 'Not Enough Points'}</span>
                              </>
                          )}
                        </button>
                    </div>
                 )}
            </div>
        )}

        {/* --- Swap Request View --- */}
        {selectedAction === 'swap' && (
             <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Propose a Swap</h2>

                 {swapRequestSuccess ? (
                     // Success Message View
                     <div className="text-center py-10">
                         <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                         <h3 className="text-xl font-semibold text-gray-900 mb-2">Swap Request Sent!</h3>
                         <p className="text-gray-600 mb-6">Your swap request for "{item.title}" has been sent to {item.uploader.name}. You will be notified of their response.</p>
                          <button
                             onClick={onBackToListings} // Option to go back to listings
                             className="bg-emerald-500 text-white px-6 py-3 rounded-xl hover:bg-emerald-600 transition-colors font-medium"
                         >
                             Back to Listings
                         </button>
                     </div>
                 ) : (
                    // Swap Request Form
                     <div className="space-y-6">
                        {/* Items involved in the swap */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                           {/* Item Being Requested */}
                           <div className="border border-gray-200 rounded-lg p-4 flex items-center space-x-4 bg-gray-50">
                              <CornerUpRight className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                              <img
                                  src={item.images[0]}
                                  alt={item.title}
                                  className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                              />
                              <div>
                                 <p className="font-medium text-gray-900">You want:</p>
                                 <h4 className="text-lg font-semibold text-gray-800">{item.title}</h4>
                              </div>
                           </div>

                           {/* Item You Offer */}
                           <div className="border border-gray-200 rounded-lg p-4 flex items-center space-x-4 bg-gray-50">
                               <CornerUpLeft className="w-6 h-6 text-blue-600 flex-shrink-0" />
                                {selectedSwapItem ? (
                                   <>
                                       <img
                                           src={selectedSwapItem.image}
                                           alt={selectedSwapItem.title}
                                           className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                                       />
                                       <div>
                                           <p className="font-medium text-gray-900">You offer:</p>
                                           <h4 className="text-lg font-semibold text-gray-800">{selectedSwapItem.title}</h4>
                                       </div>
                                   </>
                                ) : (
                                   <div className="text-gray-500 italic">Select an item below</div>
                                )}
                           </div>
                        </div>

                         {/* Your Items to Offer */}
                         <div className="bg-gray-50 rounded-xl p-6">
                             <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Items Available for Swap</h3>
                             {availableSwapItems.length > 0 ? (
                                 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                     {availableSwapItems.map(userItem => (
                                         <div
                                             key={userItem.id}
                                             className={`relative border rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ease-in-out
                                                ${selectedSwapItem?.id === userItem.id
                                                   ? 'border-emerald-500 ring-2 ring-emerald-500'
                                                   : 'border-gray-200 hover:border-gray-300'
                                                }
                                             `}
                                             onClick={() => setSelectedSwapItem(userItem)}
                                         >
                                             <img
                                                 src={userItem.image}
                                                 alt={userItem.title}
                                                 className="w-full h-24 object-cover"
                                             />
                                             <div className="p-2 text-center text-sm font-medium text-gray-800">
                                                 {userItem.title}
                                             </div>
                                              {selectedSwapItem?.id === userItem.id && (
                                                  <div className="absolute top-1 right-1 bg-emerald-500 rounded-full p-0.5">
                                                      <CheckCircle className="w-4 h-4 text-white" />
                                                  </div>
                                              )}
                                         </div>
                                     ))}
                                 </div>
                             ) : (
                                 <p className="text-center text-gray-500">You have no items available for swap.</p>
                             )}
                         </div>

                         {/* Optional Message */}
                         <div>
                             <label htmlFor="swapMessage" className="block text-sm font-medium text-gray-700 mb-2">
                                 Message (Optional)
                             </label>
                             <textarea
                                 id="swapMessage"
                                 rows={3}
                                 value={swapMessage}
                                 onChange={(e) => setSwapMessage(e.target.value)}
                                 placeholder={`Hi ${item.uploader.name}, I'm interested in swapping my ${selectedSwapItem?.title || '...' } for your ${item.title}...`}
                                 className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                             />
                         </div>

                        {swapRequestError && (
                            <p className="text-red-600 text-center text-sm">{swapRequestError}</p>
                        )}

                         {/* Send Swap Request Button */}
                         <button
                            onClick={handleSendSwapRequest}
                             className={`w-full py-3 rounded-xl transition-colors font-medium flex items-center justify-center space-x-2
                                ${canSendSwapRequest
                                   ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                                   : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                }
                             `}
                             disabled={!canSendSwapRequest || sendingSwapRequest}
                         >
                            {sendingSwapRequest ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l2-2.647z"></path>
                                    </svg>
                                    <span>Sending Request...</span>
                                </>
                            ) : (
                                <>
                                    <MessageCircle className="w-5 h-5" />
                                    <span>Send Swap Request</span>
                                </>
                            )}
                         </button>
                     </div>
                 )}
             </div>
        )}

      </div> {/* End Main Content Container */}
    </div>
  );
};

// The page component that renders the ItemActionSelectorPage
const ViewItemPage = () => {
    // In a real app, you would fetch the item and user data based on route params or context
    // Using mock data for demonstration
    const currentItem = mockItemForActions;
    const loggedInUser = mockCurrentUserForActions;

    const handleBackToListings = () => {
        console.log("Simulating navigation back to the list of items");
        // Implement your routing logic here (e.g., using react-router-dom)
        // navigate('/listings');
    };

    // In a real app, you would handle actual loading states
    // if (!currentItem || !loggedInUser) {
    //     return <div>Loading item or user data...</div>;
    // }

    return (
        <ItemActionSelectorPage
            item={currentItem}
            user={loggedInUser}
            onBackToListings={handleBackToListings}
        />
    );
};

export default ViewItemPage; // Export the page component