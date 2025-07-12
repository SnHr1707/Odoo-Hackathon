// src/Pages/AddItem.page.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-toastify';
import { Image as ImageIcon, XCircle, Award, MessageCircle } from 'lucide-react';

const PREDEFINED_TAGS = ['men', 'women', 'unisex', 'kids', 'oversized', 'vintage', 'watches', 'tapered', 'formal', 'casual', 'sports'];

const AddItemPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '', description: '', brand: '',
        listingType: 'redeem', pointsValue: ''
    });
    const [category, setCategory] = useState({ main: '', sub: '' });
    const [selectedTags, setSelectedTags] = useState([]);
    const [images, setImages] = useState([]); // This will hold Base64 strings
    const [submitting, setSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleTagChange = (tag) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const maxImages = 5;

        if (images.length + files.length > maxImages) {
            toast.error(`You can only upload a maximum of ${maxImages} images.`);
            return;
        }

        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                // The result is the Base64 Data URL
                setImages(prevImages => [...prevImages, reader.result]);
            };
            reader.onerror = () => {
                toast.error("Something went wrong while reading the image file.");
            };
            reader.readAsDataURL(file);
        });
    };

    const handleRemoveImage = (indexToRemove) => {
        setImages(images.filter((_, i) => i !== indexToRemove));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (images.length === 0) {
            toast.error("Please upload at least one image.");
            return;
        }

        const payload = {
            ...formData,
            images,
            category,
            tags: selectedTags
        };

        if (payload.listingType === 'swap') {
            delete payload.pointsValue;
        }

        setSubmitting(true);
        try {
            await api.post('/items/list', payload); // Send as JSON
            toast.success("Item listed successfully! It is now pending approval.");
            navigate('/user');
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to list item.");
        } finally {
            setSubmitting(false);
        }
    };
    
    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
                <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">List a New Item</h1>
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Item Details Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Item Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div><label>Name</label><input name="name" onChange={handleInputChange} value={formData.name} className="w-full mt-1 p-2 border rounded" required /></div>
                             <div><label>Brand</label><input name="brand" onChange={handleInputChange} value={formData.brand} className="w-full mt-1 p-2 border rounded" required /></div>
                             <div><label>Main Category</label><input value={category.main} onChange={e => setCategory({...category, main: e.target.value})} className="w-full mt-1 p-2 border rounded" required/></div>
                             <div><label>Sub Category</label><input value={category.sub} onChange={e => setCategory({...category, sub: e.target.value})} className="w-full mt-1 p-2 border rounded" required/></div>
                        </div>
                        <div className="mt-6"><label>Description</label><textarea name="description" onChange={handleInputChange} value={formData.description} className="w-full mt-1 p-2 border rounded" rows="4" required /></div>
                    </div>
                    {/* Tags Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Tags</h3>
                        <div className="flex flex-wrap gap-3">
                            {PREDEFINED_TAGS.map(tag => (
                                <button type="button" key={tag} onClick={() => handleTagChange(tag)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedTags.includes(tag) ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* Image Upload Section */}
                     <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Images (Max 5)</h3>
                         <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl">
                            <div className="space-y-1 text-center"><ImageIcon className="mx-auto h-12 w-12 text-gray-400" /><div className="flex text-sm text-gray-600"><label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500"><span>Upload files</span><input id="file-upload" type="file" className="sr-only" onChange={handleImageChange} multiple accept="image/*" disabled={images.length >= 5}/></label></div><p className="text-xs text-gray-500">PNG, JPG, GIF</p></div>
                        </div>
                         {images.length > 0 && (
                            <div className="mt-4 grid grid-cols-5 gap-4">
                                {images.map((base64, index) => (<div key={index} className="relative"><img src={base64} alt="preview" className="w-24 h-24 object-cover rounded-md" /><button type="button" onClick={() => handleRemoveImage(index)} className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"><XCircle size={16}/></button></div>))}
                            </div>
                        )}
                    </div>
                    {/* Listing Type Section */}
                    <div>
                         <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Listing Type</h3>
                        <div className="flex gap-4">
                            <button type="button" onClick={() => handleInputChange({target: {name: 'listingType', value: 'redeem'}})} className={`flex-1 p-4 border rounded-lg flex items-center justify-center gap-2 ${formData.listingType === 'redeem' ? 'border-emerald-500 bg-emerald-50' : ''}`}><Award/>Redeem with Points</button>
                            <button type="button" onClick={() => handleInputChange({target: {name: 'listingType', value: 'swap'}})} className={`flex-1 p-4 border rounded-lg flex items-center justify-center gap-2 ${formData.listingType === 'swap' ? 'border-blue-500 bg-blue-50' : ''}`}><MessageCircle/>Swap Only</button>
                        </div>
                         {formData.listingType === 'redeem' && <div className="mt-4"><label>Points Value</label><input type="number" name="pointsValue" value={formData.pointsValue} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded" min="1" required/></div>}
                    </div>
                    
                    <button type="submit" disabled={submitting} className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-700 disabled:bg-gray-400">
                        {submitting ? 'Submitting...' : 'List Item'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddItemPage;