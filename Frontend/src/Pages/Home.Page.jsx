// src/Pages/Home.page.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-toastify';
import { Star, MessageCircle } from 'lucide-react';

function HomePage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await api.get('/items');
        if (response.data && response.data.success) {
          setItems(response.data.data);
        }
      } catch (error) {
        toast.error("Failed to fetch items.");
        console.error("Fetch items error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  if (loading) {
    return <div className="text-center p-10">Loading items...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Discover & Swap</h1>
          <p className="text-xl text-gray-600 mt-4">Browse through items from our community. Find your next favorite piece!</p>
        </div>
        
        {items.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>No items are currently available. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <div key={item._id} className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <Link to={`/item/${item._id}`} className="block">
                  <div className="relative">
                    <img
                      src={`http://localhost:8000${item.images[0]}`}
                      alt={item.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-3 left-3">
                      {item.listingType === 'redeem' && (
                        <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {item.pointsValue} pts
                        </span>
                      )}
                      {item.listingType === 'swap' && (
                        <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Direct Swap
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
                  
                  <div className="mt-auto pt-4">
                     <Link 
                        to={`/item/${item._id}`}
                        className="w-full mt-4 bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
                      >
                        <MessageCircle className="w-4 h-4" />
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