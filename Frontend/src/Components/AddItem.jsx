import React, { useState, useEffect } from 'react'; // Import useEffect
import {
  ArrowLeft,
  Shirt,
  Tag,
  Award,
  MessageCircle,
  Package,
  Image as ImageIcon, // Renamed to avoid conflict with HTML tag
  DollarSign, // Added DollarSign for potential "buy with money" future feature indication
  XCircle // Added XCircle for removing image previews
} from 'lucide-react';

const AddItemPage = ({ onBack, onSuccessfulAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '', // Added category field
    method: 'points', // 'points', 'swap', 'both', or 'money' (future)
    points: '',
    // In a real app, you'd handle image files here, using File or Blob objects
    images: [], // Array to hold image files
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]); // State to hold image preview URLs

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMethodChange = (method) => {
    setFormData({ ...formData, method });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Limit to a maximum number of images (e.g., 5)
    const maxImages = 5;
    const currentImageCount = formData.images.length;
    const filesToAdd = files.slice(0, maxImages - currentImageCount);

    const newImageFiles = [...formData.images, ...filesToAdd];
    const newImagePreviewUrls = newImageFiles.map(file => {
        // Check if it's a File object before creating URL
        if (file instanceof File) {
            return URL.createObjectURL(file);
        }
        return file; // If it's already a URL (e.g., from mock data if you added it)
    });


    setFormData({ ...formData, images: newImageFiles });
    setImagePreviews(newImagePreviewUrls);
  };

  const handleRemoveImage = (indexToRemove) => {
      // Revoke the Object URL for the image being removed
      if (imagePreviews[indexToRemove]) {
          URL.revokeObjectURL(imagePreviews[indexToRemove]);
      }

      const newImages = formData.images.filter((_, index) => index !== indexToRemove);
      const newPreviews = imagePreviews.filter((_, index) => index !== indexToRemove); // Filter previews too
      setFormData({ ...formData, images: newImages });
      setImagePreviews(newPreviews);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.title || !formData.description || formData.images.length === 0) {
      setSubmitError('Please fill in all required fields and upload at least one image.');
      return;
    }

    if ((formData.method === 'points' || formData.method === 'both') && (!formData.points || parseFloat(formData.points) <= 0)) {
         setSubmitError('Please enter a valid positive points value for this listing method.');
         return;
    }
     // Clear points if method is only swap
     if (formData.method === 'swap') {
         setFormData(prevData => ({ ...prevData, points: '' }));
     }


    setSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(null);

    // Simulate item creation process
    console.log("Submitting item:", formData);

    // In a real app, you would send formData to your backend API:
    // const uploadData = new FormData();
    // uploadData.append('title', formData.title);
    // uploadData.append('description', formData.description);
    // uploadData.append('category', formData.category);
    // uploadData.append('method', formData.method);
    // if (formData.method === 'points' || formData.method === 'both') {
    //    uploadData.append('points', formData.points);
    // }
    // formData.images.forEach((image, index) => {
    //    uploadData.append(`images`, image); // Use the same key 'images' if backend expects array
    // });
    // try {
    //   const response = await fetch('/api/items', {
    //     method: 'POST',
    //     body: uploadData, // Use FormData for file uploads
    //   });
    //   if (!response.ok) {
    //     throw new Error('Failed to add item');
    //   }
    //   const newItem = await response.json(); // Get the newly created item data
    //   setSubmitSuccess(true);
    //   console.log("Item added successfully:", newItem);
    //   // Clear form or navigate away after success handled by parent
    //   if (onSuccessfulAdd) {
    //     onSuccessfulAdd(newItem); // Notify parent component and pass new item data
    //   }
    // } catch (error) {
    //   setSubmitError(error.message);
    //   console.error("Error adding item:", error);
    // } finally {
    //   setSubmitting(false);
    // }

    // --- Frontend Mock Simulation ---
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay
    const mockSuccess = true; // Change to false to simulate an error

    if (mockSuccess) {
        setSubmitSuccess(true);
        console.log("Item added successfully (frontend mock)");
        // Clear form and previews after simulated success
        setFormData({ title: '', description: '', category: '', method: 'points', points: '', images: [] });
        imagePreviews.forEach(url => URL.revokeObjectURL(url)); // Clean up old previews
        setImagePreviews([]);
        if (onSuccessfulAdd) {
             // Simulate passing some new item data back (basic structure)
            onSuccessfulAdd({ id: Date.now(), ...formData, status: 'available', views: 0, likes: 0, dateUploaded: new Date().toISOString(), imageUrl: imagePreviews[0] }); // Pass first image preview as imageUrl mock
        }
    } else {
        setSubmitError("Simulated item add failed.");
        console.error("Item add failed (frontend mock)");
    }
    setSubmitting(false);
     // --- End Frontend Mock Simulation ---
  };

  // Clean up object URLs when component unmounts or image previews change
  useEffect(() => {
      return () => {
          // Revoke all current image preview URLs on unmount
          imagePreviews.forEach(url => URL.revokeObjectURL(url));
      };
  }, [imagePreviews]); // Re-run cleanup if imagePreviews array changes

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
             {/* User info could go here */}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         {/* Back Button */}
        {/* Only show back button if not on the success screen */}
        {!submitSuccess && (
            <button
              onClick={onBack}
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </button>
        )}


        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">List a New Item</h1>

             {submitSuccess ? (
                 // Success Message View
                 <div className="text-center py-10">
                     <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                     <h3 className="text-xl font-semibold text-gray-900 mb-2">Item Listed Successfully!</h3>
                     {/* Display the title of the item just added if available from state */}
                     <p className="text-gray-600 mb-6">Your item"{submitError ? '' : formData.title}" has been added to your listings.</p>
                     <button
                         onClick={onBack} // Option to go back
                         className="bg-emerald-500 text-white px-6 py-3 rounded-xl hover:bg-emerald-600 transition-colors font-medium"
                     >
                         Back to Dashboard
                     </button>
                 </div>
             ) : (
                 // Add Item Form
                 <form onSubmit={handleSubmit} className="space-y-6">
                     {/* Item Details */}
                     <div>
                         <h3 className="text-lg font-semibold text-gray-900 mb-4">Item Details</h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div>
                                 <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                 <input
                                     type="text"
                                     id="title"
                                     name="title"
                                     value={formData.title}
                                     onChange={handleInputChange}
                                     className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                     required
                                 />
                             </div>
                             <div>
                                 <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                  {/* Simple select dropdown for category */}
                                 <select
                                     id="category"
                                     name="category"
                                     value={formData.category}
                                     onChange={handleInputChange}
                                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                                     required
                                 >
                                     <option value="">Select a category</option>
                                     <option value="clothing-tops">Clothing: Tops</option>
                                     <option value="clothing-bottoms">Clothing: Bottoms</option>
                                     <option value="clothing-dresses">Clothing: Dresses</option>
                                     <option value="clothing-outerwear">Clothing: Outerwear</option>
                                     <option value="accessories">Accessories</option>
                                     <option value="shoes">Shoes</option>
                                      <option value="other">Other</option>
                                 </select>
                             </div>
                         </div>
                         <div className="mt-4">
                             <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                             <textarea
                                 id="description"
                                 name="description"
                                 rows={4}
                                 value={formData.description}
                                 onChange={handleInputChange}
                                 className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                 placeholder="Provide a detailed description of the item, including size, condition, material, etc."
                                 required
                             />
                         </div>
                     </div>

                     {/* Images Upload */}
                      <div>
                         <h3 className="text-lg font-semibold text-gray-900 mb-4">Images</h3>
                         <label className="block text-sm font-medium text-gray-700 mb-2">Upload Photos (Max 5)</label>
                         <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer hover:border-gray-400 transition-colors">
                            <div className="space-y-1 text-center">
                              <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                              <div className="flex text-sm text-gray-600">
                                 <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-emerald-500"
                                 >
                                    <span>Upload a file</span>
                                    <input
                                       id="file-upload"
                                       name="file-upload"
                                       type="file"
                                       className="sr-only"
                                       onChange={handleImageChange}
                                       multiple
                                       accept="image/*" // Accept image files
                                       disabled={formData.images.length >= 5} // Disable if max images reached
                                    />
                                 </label>
                                 <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p> {/* Adjust max size */}
                            </div>
                         </div>
                         {/* Image Previews */}
                         {imagePreviews.length > 0 && (
                              <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4">
                                 {imagePreviews.map((previewUrl, index) => (
                                     <div key={index} className="relative w-24 h-24"> {/* Removed group class as not needed here */}
                                         <img
                                             src={previewUrl}
                                             alt={`Image preview ${index + 1}`}
                                             className="w-full h-full object-cover rounded-md border border-gray-200"
                                         />
                                         {/* Show remove button always on hover/touch, no need for group-hover */}
                                         <button
                                             type="button"
                                             onClick={() => handleRemoveImage(index)}
                                             className="absolute top-1 right-1 bg-red-500 rounded-full p-0.5 text-white hover:bg-red-600 transition-colors flex items-center justify-center"
                                             style={{ width: '20px', height: '20px' }} // Fixed size for the remove button
                                         >
                                              <XCircle className="w-4 h-4" />
                                         </button>
                                     </div>
                                 ))}
                              </div>
                         )}
                      </div>


                     {/* Listing Method */}
                     <div>
                         <h3 className="text-lg font-semibold text-gray-900 mb-4">Listing Method</h3>
                         <div className="mt-2 space-y-4">
                            <div className="flex items-center">
                                 <input
                                     id="method-points"
                                     name="method"
                                     type="radio"
                                     value="points"
                                     checked={formData.method === 'points'}
                                     onChange={() => handleMethodChange('points')}
                                     className="focus:ring-emerald-500 h-4 w-4 text-emerald-600 border-gray-300 cursor-pointer"
                                 />
                                 <label htmlFor="method-points" className="ml-3 flex items-center text-sm font-medium text-gray-700 cursor-pointer">
                                     <Award className="w-5 h-5 mr-2 text-emerald-600" /> List for Points
                                 </label>
                            </div>
                             <div className="flex items-center">
                                 <input
                                     id="method-swap"
                                     name="method"
                                     type="radio"
                                     value="swap"
                                     checked={formData.method === 'swap'}
                                     onChange={() => handleMethodChange('swap')}
                                     className="focus:ring-emerald-500 h-4 w-4 text-emerald-600 border-gray-300 cursor-pointer"
                                 />
                                 <label htmlFor="method-swap" className="ml-3 flex items-center text-sm font-medium text-gray-700 cursor-pointer">
                                     <MessageCircle className="w-5 h-5 mr-2 text-blue-600" /> List for Swap
                                 </label>
                            </div>
                             {/* Option for both points and swap */}
                            <div className="flex items-center">
                                 <input
                                     id="method-both"
                                     name="method"
                                     type="radio"
                                     value="both"
                                     checked={formData.method === 'both'}
                                     onChange={() => handleMethodChange('both')}
                                     className="focus:ring-emerald-500 h-4 w-4 text-emerald-600 border-gray-300 cursor-pointer"
                                 />
                                 <label htmlFor="method-both" className="ml-3 flex items-center text-sm font-medium text-gray-700 cursor-pointer">
                                      <Award className="w-5 h-5 mr-2 text-emerald-600" /> + <MessageCircle className="w-5 h-5 mr-2 text-blue-600" /> List for Points OR Swap
                                 </label>
                            </div>
                             {/* Option for money (greyed out/disabled) */}
                             <div className="flex items-center">
                                 <input
                                     id="method-money"
                                     name="method"
                                     type="radio"
                                     value="money"
                                     checked={formData.method === 'money'}
                                     // onChange={() => handleMethodChange('money')} // Disabled for now
                                     className="focus:ring-gray-300 h-4 w-4 text-gray-400 border-gray-300 cursor-not-allowed"
                                     disabled // Disabled as per requirement
                                 />
                                 <label htmlFor="method-money" className="ml-3 flex items-center text-sm font-medium text-gray-500 cursor-not-allowed">
                                     <DollarSign className="w-5 h-5 mr-2 text-gray-400" /> List for Money <span className="text-xs ml-2">(Coming Soon)</span>
                                 </label>
                            </div>
                         </div>
                     </div>

                     {/* Points Input (Conditionally rendered) */}
                     {(formData.method === 'points' || formData.method === 'both') && (
                         <div>
                             <label htmlFor="points" className="block text-sm font-medium text-gray-700 mb-2">Points Required</label>
                             <input
                                 type="number"
                                 id="points"
                                 name="points"
                                 value={formData.points}
                                 onChange={handleInputChange}
                                 className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                 placeholder="Enter the points required for this item"
                                 min="1" // Points should be at least 1 if required
                                 required={formData.method === 'points' || formData.method === 'both'} // Required if method is points or both
                             />
                         </div>
                     )}

                    {/* Error Message */}
                    {submitError && (
                        <p className="text-red-600 text-center text-sm">{submitError}</p>
                    )}

                     {/* Submit Button */}
                     <div className="flex justify-center">
                         <button
                             type="submit"
                             className={`w-full md:w-auto bg-emerald-500 text-white px-8 py-3 rounded-xl hover:bg-emerald-600 transition-colors font-medium flex items-center justify-center space-x-2
                                 ${submitting ? 'opacity-75 cursor-not-allowed' : ''}
                             `}
                             disabled={submitting}
                         >
                             {submitting ? (
                                 <>
                                     <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l2-2.647z"></path>
                                     </svg>
                                     <span>Adding Item...</span>
                                 </>
                             ) : (
                                 <span>Add Item</span>
                             )}
                         </button>
                     </div>
                 </form>
             )}
        </div>
      </div>
    </div>
  );
};

export default AddItemPage;