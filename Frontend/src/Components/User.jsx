// src/components/User.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User, Award, Shirt, Settings, LogOut, Plus, Banknote, Package, Truck, CheckCircle
} from 'lucide-react';

const getStatusColor = (status) => {
    const colors = {
        approved: 'bg-emerald-100 text-emerald-700',
        pending: 'bg-yellow-100 text-yellow-700',
        rejected: 'bg-red-100 text-red-700',
        swapped: 'bg-blue-100 text-blue-700',
        redeemed: 'bg-purple-100 text-purple-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
};

const UserDashboard = ({ dashboardData, onNavigateToListing, onLogout }) => {
  const [activeTab, setActiveTab] = useState('items');
  const navigate = useNavigate();
  const { profile, itemsOverview, userItems, ongoingSwaps, completedTransactions } = dashboardData;

  const renderItems = () => (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">My Listed Items ({userItems.length})</h2>
            <button onClick={onNavigateToListing} className="bg-emerald-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-emerald-600"><Plus size={16} />Add Item</button>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {userItems.length > 0 ? userItems.map((item) => (
                <div key={item._id} onClick={() => navigate(`/item/${item._id}`)} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="relative"><img src={`http://localhost:8000${item.images[0]}`} alt={item.name} className="w-full h-48 object-cover" />
                        <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>{item.status}</span>
                    </div>
                    <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 truncate">{item.name}</h3>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-emerald-600 font-bold">{item.listingType === 'redeem' ? `${item.pointsValue} pts` : 'Swap'}</span>
                            <span className="text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            )) : <p className="col-span-full text-center text-gray-500 py-8">You haven't listed any items yet.</p>}
        </div>
    </div>
  );

  const renderTransactions = () => (
      <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">My Activity & Orders</h2>
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <div className="space-y-4">
                  {completedTransactions.length > 0 ? (
                      completedTransactions.map(tx => {
                        // Special rendering for redeemed items (Orders)
                        if (tx.type === 'redeem_item' && tx.relatedItems.length > 0) {
                            const item = tx.relatedItems[0];
                            return (
                                <div key={tx._id} className="p-4 bg-gray-50 rounded-xl border">
                                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                                        <div className="flex items-center gap-4">
                                            <img src={`http://localhost:8000${item.images[0]}`} alt={item.name} className="w-16 h-16 object-cover rounded-md"/>
                                            <div>
                                                <p className="font-semibold text-gray-900">Redeemed: {item.name}</p>
                                                <p className="text-sm text-gray-500">{new Date(tx.createdAt).toLocaleString()}</p>
                                            </div>
                                        </div>
                                        <span className={`font-bold text-lg text-red-500`}>
                                          {tx.pointsChange} pts
                                        </span>
                                    </div>
                                    {/* Dummy Order Status Tracker */}
                                    <div className="mt-4 pt-4 border-t">
                                        <h4 className="text-sm font-semibold mb-3">Order Status</h4>
                                        <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm">
                                            <div className="flex items-center gap-2 text-emerald-600"><CheckCircle size={16}/><span>Order Confirmed</span></div>
                                            <div className="flex-1 h-0.5 bg-gray-200"></div>
                                            <div className="flex items-center gap-2 text-emerald-600"><Package size={16}/><span>Dispatched</span></div>
                                            <div className="flex-1 h-0.5 bg-gray-200"></div>
                                            <div className="flex items-center gap-2 text-gray-400"><Truck size={16}/><span>Out for Delivery</span></div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        // Default rendering for other transactions
                        return (
                          <div key={tx._id} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                              <div>
                                  <p className="font-medium text-gray-900 capitalize">{tx.description}</p>
                                  <p className="text-sm text-gray-500">{new Date(tx.createdAt).toLocaleString()}</p>
                              </div>
                              <span className={`font-bold text-lg ${tx.pointsChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                  {tx.pointsChange > 0 ? `+${tx.pointsChange}` : tx.pointsChange}
                              </span>
                          </div>
                        )
                      })
                  ) : (
                      <p className="text-center text-gray-500 py-8">You have no transaction history yet.</p>
                  )}
              </div>
          </div>
      </div>
  );
  
  const renderSettings = () => (
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Settings</h2>
          <p>Settings functionality will be implemented here.</p>
      </div>
  );

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1 lg:sticky lg:top-24 self-start">
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-100">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{profile.username}</h3>
                <p className="text-gray-500 text-sm">{profile.email}</p>
              </div>
              <div className="space-y-2 mb-6 text-center">
                  <div className="bg-emerald-50 rounded-lg p-3">
                    <div className="text-lg font-bold text-emerald-600">{profile.points}</div>
                    <div className="text-xs text-gray-600">Available Points</div>
                  </div>
                   <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-lg font-bold text-gray-900">{itemsOverview.totalListed}</div>
                    <div className="text-xs text-gray-600">Items Listed</div>
                  </div>
              </div>
              <button onClick={onNavigateToListing} className="w-full bg-emerald-500 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-emerald-600">
                <Plus size={20} /> List New Item
              </button>
            </div>

            <nav className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
              <div className="space-y-2">
                {[
                    {name: 'items', icon: Shirt, label: 'My Listings'},
                    {name: 'transactions', icon: Banknote, label: 'My Activity & Orders'},
                    {name: 'settings', icon: Settings, label: 'Settings'}
                ].map(tab => (
                    <button key={tab.name} onClick={() => setActiveTab(tab.name)}
                        className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 ${activeTab === tab.name ? 'bg-emerald-50 text-emerald-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                        <tab.icon size={20} /> <span>{tab.label}</span>
                    </button>
                ))}
              </div>
            </nav>
          </aside>

          <main className="lg:col-span-3">
            {activeTab === 'items' && renderItems()}
            {activeTab === 'transactions' && renderTransactions()}
            {activeTab === 'settings' && renderSettings()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;