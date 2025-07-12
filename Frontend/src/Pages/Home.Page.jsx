// src/Pages/Home.page.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-toastify';
import { MessageCircle, Search, Tag, Calendar, ChevronDown, Award } from 'lucide-react';

const DEBOUNCE_DELAY = 500;

function HomePage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  
  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (sortOrder) params.append('sort', sortOrder);
      
      const response = await api.get(`/items?${params.toString()}`);
      
      if (response.data && response.data.success) {
        setItems(response.data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch items.");
    } finally {
      setLoading(false);
    }
  }, [searchQuery, sortOrder]);

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchItems();
    }, DEBOUNCE_DELAY);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, sortOrder, fetchItems]);

  return (
    <div className="bg-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Discover & Swap</h1>
          <p className="text-xl text-gray-600 mt-4">Browse through items from our community. Find your next favorite piece!</p>
        </div>

        {/* ... (Filter and Search Bar remains the same) ... */}
        <div className="mb-8 p-4 bg-white rounded-xl shadow-sm border flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-grow w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
                <input 
                    type="text"
                    placeholder="Search by name, brand, or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
            </div>
            <div className="relative w-full md:w-auto">
                 <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="w-full appearance-none bg-white border rounded-lg py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                 >
                    <option value="newest">Sort by: Newest</option>
                    <option value="oldest">Sort by: Oldest</option>
                    <option value="points_asc">Points: Low to High</option>
                    <option value="points_desc">Points: High to Low</option>
                 </select>
                 <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
            </div>
        </div>
        
        {loading ? (
           <div className="text-center p-10">Loading items...</div>
        ) : items.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            <p className="text-xl">No items found matching your criteria.</p>
            <p>Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <div key={item._id} className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <Link to={`/item/${item._id}`} className="block">
                  <div className="relative">
                    {/* MODIFIED: Display Base64 image directly */}
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-3 right-3">
                      {item.listingType === 'redeem' && item.pointsValue && (
                        <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                          <Award size={14}/> {item.pointsValue}
                        </span>
                      )}
                      {item.listingType === 'swap' && (
                        <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Swap
                        </span>
                      )}
                    </div>
                  </div>
                </Link>

                <div className="p-4 flex-grow flex flex-col">
                  <h3 className="font-semibold text-gray-900 mb-1 truncate">
                    <Link to={`/item/${item._id}`} className="hover:text-emerald-600">{item.name}</Link>
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">{item.brand}</p>
                  
                  <div className="mt-auto pt-4 border-t">
                     <Link 
                        to={`/item/${item._id}`}
                        className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
                      >
                        <span>View Details</span>
                      </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;