import React, { useState } from 'react';
import {
  Shirt,
  CheckCircle, // For Approve
  XCircle, // For Reject
  Trash2, // For Remove
  Clock, // For Pending status
  Package, // For other statuses
  User, // For Uploader
  MapPin, // For location
  ArrowLeft, // For Back button in detail view
  Image as ImageIcon, // For image previews
  Tag, // For points/method indication
  Award, // For points icon
  MessageCircle // For swap icon
} from 'lucide-react';

// Helper function for status color (reused)
const getStatusColor = (status) => {
  switch (status) {
    case 'available': return 'bg-emerald-100 text-emerald-700';
    case 'swapped': return 'bg-gray-100 text-gray-700';
    case 'pending': return 'bg-yellow-100 text-yellow-700';
    case 'rejected': return 'bg-red-100 text-red-700'; // Added rejected color
    default: return 'bg-gray-100 text-gray-700';
  }
};

// This component receives the list of items and action handlers as props
const AdminPanelPage = ({ items, onApprove, onReject, onRemove }) => {
    // State to filter items: 'pending', 'all'
    const [filter, setFilter] = useState('pending');
    // State to hold the item currently being viewed in detail
    const [selectedItemDetail, setSelectedItemDetail] = useState(null);

    // Filter the items based on the selected filter
    const filteredItems = Array.isArray(items) ? items.filter(item => {
        if (filter === 'pending') {
            return item.status === 'pending';
        }
        return true; // 'all' filter shows all items
    }) : []; // Default to empty array if items is not an array

    // Calculate counts safely, defaulting to 0 if items is not an array
    const pendingCount = Array.isArray(items) ? items.filter(item => item.status === 'pending').length : 0;
    const totalCount = Array.isArray(items) ? items.length : 0;

    // Function to handle item click for detail view
    const handleViewDetail = (item) => {
        setSelectedItemDetail(item);
    };

    // Function to close the detail view
    const handleCloseDetail = () => {
        setSelectedItemDetail(null);
    };

    // Function to handle actions from the detail view
    const handleActionFromDetail = (actionType, itemId) => {
        // Call the appropriate parent handler
        if (actionType === 'approve' && onApprove) onApprove(itemId);
        if (actionType === 'reject' && onReject) onReject(itemId);
        if (actionType === 'remove' && onRemove) onRemove(itemId);

        // After an action, potentially close the detail view or update the item in view
        // For simplicity here, we'll close the detail view after any action.
        // In a more complex app, you might refresh the item data or update its status locally.
        handleCloseDetail();
    };


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
                            <span className="text-xl font-bold text-gray-900">ReWear Admin</span>
                        </div>
                         {/* Could add admin user info or logout here */}
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Conditionally render list view or detail view */}
                {selectedItemDetail ? (
                    // --- Item Detail View ---
                    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                         {/* Back Button */}
                        <button
                            onClick={handleCloseDetail}
                            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Back to List</span>
                        </button>

                        <h1 className="text-2xl font-bold text-gray-900 mb-4">{selectedItemDetail.title || 'Untitled Item'}</h1>

                         <div className="grid md:grid-cols-2 gap-6">
                            {/* Images Section */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Images</h3>
                                 {selectedItemDetail.images && selectedItemDetail.images.length > 0 ? (
                                     <div className="grid grid-cols-2 gap-4">
                                         {selectedItemDetail.images.map((imageUrl, index) => (
                                             <img
                                                key={index}
                                                src={imageUrl}
                                                alt={`${selectedItemDetail.title} image ${index + 1}`}
                                                className="w-full h-48 object-cover rounded-lg border border-gray-200"
                                             />
                                         ))}
                                     </div>
                                 ) : (
                                     <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                                         <ImageIcon className="w-12 h-12" />
                                     </div>
                                 )}
                            </div>

                            {/* Details Section */}
                             <div className="space-y-4">
                                 <h3 className="text-lg font-semibold text-gray-900 mb-3">Details</h3>

                                 {/* Status */}
                                 <div className="flex items-center space-x-2">
                                     <span className="font-medium text-gray-700">Status:</span>
                                     <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedItemDetail.status || 'unknown')}`}>
                                        {selectedItemDetail.status === 'pending' && <Clock className="w-3 h-3 inline-block mr-1" />}
                                        {selectedItemDetail.status || 'unknown'}
                                    </span>
                                 </div>

                                  {/* Listing Method */}
                                 <div className="flex items-center space-x-2">
                                     <span className="font-medium text-gray-700">Method:</span>
                                     <span className="text-gray-800 capitalize flex items-center space-x-1">
                                         {selectedItemDetail.method === 'points' && <Award className="w-4 h-4 text-emerald-600" />}
                                         {selectedItemDetail.method === 'swap' && <MessageCircle className="w-4 h-4 text-blue-600" />}
                                          {selectedItemDetail.method === 'both' && (
                                              <>
                                                <Award className="w-4 h-4 text-emerald-600" />
                                                <MessageCircle className="w-4 h-4 text-blue-600" />
                                              </>
                                          )}
                                         <span>{selectedItemDetail.method || 'N/A'}</span>
                                         {selectedItemDetail.method === 'points' || selectedItemDetail.method === 'both' ? `(${selectedItemDetail.points || 0} pts)` : ''}
                                     </span>
                                 </div>

                                 {/* Category, Size, Condition */}
                                  <div className="grid grid-cols-2 gap-4">
                                     <div>
                                         <span className="font-medium text-gray-700 block mb-1">Category:</span>
                                          <span className="text-gray-800 capitalize">{selectedItemDetail.category || 'N/A'}</span>
                                     </div>
                                     <div>
                                         <span className="font-medium text-gray-700 block mb-1">Size:</span>
                                          <span className="text-gray-800">{selectedItemDetail.size || 'N/A'}</span>
                                     </div>
                                      <div className="col-span-2"> {/* Span across two columns */}
                                         <span className="font-medium text-gray-700 block mb-1">Condition:</span>
                                          <span className="text-gray-800 capitalize">{selectedItemDetail.condition || 'N/A'}</span>
                                     </div>
                                  </div>

                                 {/* Description */}
                                 <div>
                                     <span className="font-medium text-gray-700 block mb-1">Description:</span>
                                      <p className="text-gray-800">{selectedItemDetail.description || 'No description provided.'}</p>
                                 </div>

                                  {/* Tags */}
                                  {selectedItemDetail.tags && (
                                     <div>
                                        <span className="font-medium text-gray-700 block mb-1">Tags:</span>
                                         <p className="text-gray-800">{selectedItemDetail.tags}</p>
                                     </div>
                                  )}

                                {/* Uploader Info */}
                                {selectedItemDetail.uploader && (
                                   <div className="mt-4">
                                      <span className="font-medium text-gray-700 block mb-2">Uploader:</span>
                                      <div className="flex items-center space-x-3">
                                         <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center text-gray-500 text-sm font-medium">
                                            {/* Placeholder for avatar */}
                                             {selectedItemDetail.uploader.avatar ? (
                                                <img src={selectedItemDetail.uploader.avatar} alt={selectedItemDetail.uploader.name} className="w-full h-full rounded-full object-cover" />
                                             ) : (
                                                selectedItemDetail.uploader.name?.charAt(0) || '?' // Use optional chaining for name
                                             )}
                                         </div>
                                         <div>
                                            <p className="font-medium text-gray-900">{selectedItemDetail.uploader.name || 'Unknown User'}</p>
                                             <p className="text-sm text-gray-500 flex items-center space-x-1 mt-0.5">
                                               <MapPin className="w-4 h-4" />
                                               <span>{selectedItemDetail.uploader.location || 'Unknown Location'}</span>
                                             </p>
                                         </div>
                                      </div>
                                   </div>
                                )}

                                {/* Date Listed */}
                                {selectedItemDetail.dateListed && (
                                   <div>
                                      <span className="font-medium text-gray-700 block mb-1">Date Listed:</span>
                                       <span className="text-gray-800">{new Date(selectedItemDetail.dateListed).toLocaleDateString()}</span>
                                   </div>
                                )}
                            </div> {/* End Details Section */}
                         </div> {/* End Detail Grid */}

                         {/* Actions in Detail View */}
                          <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end space-x-4">
                              {selectedItemDetail.status === 'pending' && (
                                   <>
                                      <button
                                          onClick={() => handleActionFromDetail('approve', selectedItemDetail.id)}
                                          className="px-4 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors font-medium flex items-center space-x-2"
                                      >
                                          <CheckCircle className="w-5 h-5" />
                                          <span>Approve</span>
                                      </button>
                                       <button
                                          onClick={() => handleActionFromDetail('reject', selectedItemDetail.id)}
                                          className="px-4 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-colors font-medium flex items-center space-x-2"
                                      >
                                           <XCircle className="w-5 h-5" />
                                          <span>Reject</span>
                                      </button>
                                   </>
                              )}
                               {/* Remove button (available in detail view regardless of status) */}
                               <button
                                  onClick={() => handleActionFromDetail('remove', selectedItemDetail.id)}
                                   className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-medium flex items-center space-x-2"
                               >
                                  <Trash2 className="w-5 h-5" />
                                  <span>Remove</span>
                               </button>
                          </div>

                    </div>

                ) : (
                    // --- Item List View (Current Table) ---
                    <>
                        <h1 className="text-2xl font-bold text-gray-900 mb-6">Item Moderation</h1>

                        {/* Filter Controls */}
                        <div className="mb-6 flex space-x-4">
                           <button
                               onClick={() => setFilter('pending')}
                               className={`px-4 py-2 rounded-xl transition-colors font-medium ${
                                   filter === 'pending' ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                               }`}
                           >
                               Pending ({pendingCount})
                           </button>
                            <button
                               onClick={() => setFilter('all')}
                               className={`px-4 py-2 rounded-xl transition-colors font-medium ${
                                   filter === 'all' ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                               }`}
                           >
                               All Items ({totalCount})
                           </button>
                        </div>

                       <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                           {/* Table Header */}
                           <div className="grid grid-cols-5 md:grid-cols-6 gap-4 px-6 py-4 border-b border-gray-200 bg-gray-50 font-semibold text-gray-700 text-sm">
                               <div className="col-span-2 md:col-span-1">Item</div>
                                <div className="hidden md:block">Uploader</div> {/* Hidden on small screens */}
                               <div>Status</div>
                                <div className="hidden md:block">Method</div> {/* Hidden on small screens */}
                               <div className="col-span-2 text-right">Actions</div>
                           </div>

                           {/* Table Body */}
                           {filteredItems.length > 0 ? (
                               filteredItems.map(item => (
                                   // Make the row clickable to view details
                                   <div
                                       key={item.id}
                                       className="grid grid-cols-5 md:grid-cols-6 gap-4 items-center px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                                       onClick={() => handleViewDetail(item)} // Add onClick handler
                                   >
                                       {/* Item Info */}
                                       <div className="col-span-2 md:col-span-1 flex items-center space-x-3">
                                           <img
                                               src={item.images?.[0] || 'https://via.placeholder.com/50?text=No+Image'}
                                               alt={item.title || 'No title'}
                                               className="w-12 h-12 object-cover rounded-md flex-shrink-0 border border-gray-200"
                                           />
                                           <div className="text-sm font-medium text-gray-900 truncate">
                                               {item.title || 'Untitled Item'}
                                           </div>
                                       </div>

                                       {/* Uploader Info (visible on medium screens and up) */}
                                       <div className="hidden md:block text-sm text-gray-700 truncate">
                                           {item.uploader?.name || 'N/A'}
                                       </div>

                                       {/* Status */}
                                       <div className="text-sm">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status || 'unknown')}`}>
                                               {item.status === 'pending' && <Clock className="w-3 h-3 inline-block mr-1" />}
                                                {item.status || 'unknown'}
                                            </span>
                                       </div>
                                        {/* Method (visible on medium screens and up) */}
                                        <div className="hidden md:block text-sm text-gray-700 capitalize truncate">
                                            {item.method || 'N/A'} {item.method === 'points' || item.method === 'both' ? `(${item.points || 0} pts)` : ''}
                                        </div>

                                       {/* Actions (Visible only in list view - simplified) */}
                                        {/* Actions in list view are primarily for quick moderation of pending items */}
                                       <div className="col-span-2 flex justify-end space-x-2 text-right">
                                            {item.status === 'pending' ? (
                                                // Quick actions for Pending items in list view
                                                <>
                                                   <button
                                                       onClick={(e) => { e.stopPropagation(); onApprove(item.id); }} // Stop propagation to prevent triggering detail view
                                                       className="p-2 text-emerald-600 hover:text-emerald-800"
                                                       title="Approve"
                                                   >
                                                       <CheckCircle className="w-5 h-5" />
                                                   </button>
                                                    <button
                                                       onClick={(e) => { e.stopPropagation(); onReject(item.id); }} // Stop propagation
                                                       className="p-2 text-yellow-600 hover:text-yellow-800"
                                                       title="Reject"
                                                   >
                                                        <XCircle className="w-5 h-5" />
                                                   </button>
                                                </>
                                            ) : (
                                                // Indicate review status for non-pending items
                                                 <span className="text-sm text-gray-500 italic">Reviewed</span>
                                            )}
                                             {/* Remove button in list view */}
                                            <button
                                               onClick={(e) => { e.stopPropagation(); onRemove(item.id); }} // Stop propagation
                                               className="p-2 text-red-600 hover:text-red-800"
                                               title="Remove Item"
                                            >
                                               <Trash2 className="w-5 h-5" />
                                            </button>
                                       </div>
                                   </div>
                               ))
                           ) : (
                               <div className="p-6 text-center text-gray-500">
                                   {filter === 'pending' ? 'No items currently require moderation.' : 'No items found based on filter.'}
                               </div>
                           )}
                       </div>
                   </>
                )}

            </div> {/* End Main Content Container */}
        </div>
    );
};

export default AdminPanelPage;