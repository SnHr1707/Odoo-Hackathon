import React, { useState } from 'react';
import {
  User,
  Award,
  Shirt,
  Settings,
  LogOut,
  Plus,
  Eye,
  Heart,
  MessageCircle,
  Clock,
  CheckCircle,
  ArrowUpRight,
  Leaf,
  TrendingUp,
  Calendar,
  MapPin,
  Star,
  Edit3
} from 'lucide-react';

// Removed TypeScript interface:
// interface UserDashboardProps {
//   user: any; // Expected user object structure: { points: number, name: string, location: string, rating: number, swapsCompleted: number, itemsListed: number, email: string }
//   onNavigateToListing: () => void;
//   onLogout: () => void;
// }

// Removed React.FC type annotation from the function signature
const UserDashboard = ({ user, onNavigateToListing, onLogout }) => {
  // Removed type annotation from useState
  const [activeTab, setActiveTab] = useState('overview'); // State now inferred as string

  // Mock data for uploaded items (no changes needed here)
  const uploadedItems = [
    {
      id: 1,
      title: "Vintage Denim Jacket",
      image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=300",
      status: "available",
      views: 24,
      likes: 5,
      points: 120,
      dateUploaded: "2025-01-10"
    },
    {
      id: 2,
      title: "Black Formal Dress",
      image: "https://images.pexels.com/photos/1061588/pexels-photo-1061588.jpeg?auto=compress&cs=tinysrgb&w=300",
      status: "swapped",
      views: 18,
      likes: 8,
      points: 150,
      dateUploaded: "2025-01-08"
    },
    {
      id: 3,
      title: "Cozy Wool Sweater",
      image: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=300",
      status: "pending",
      views: 12,
      likes: 3,
      points: 95,
      dateUploaded: "2025-01-12"
    }
  ];

  // Mock data for swaps (no changes needed here)
  const ongoingSwaps = [
    {
      id: 1,
      type: "direct",
      myItem: "Vintage Denim Jacket",
      theirItem: "Leather Boots",
      otherUser: "Sarah M.",
      status: "negotiating",
      lastActivity: "2h ago",
      avatar: null
    },
    {
      id: 2,
      type: "points",
      myItem: "Summer Dress",
      points: 120,
      otherUser: "Emma K.",
      status: "confirmed",
      lastActivity: "1d ago",
      avatar: null
    }
  ];

  const completedSwaps = [
    {
      id: 1,
      type: "direct",
      myItem: "Black Formal Dress",
      theirItem: "Designer Blouse",
      otherUser: "Lisa R.",
      completedDate: "2025-01-05",
      rating: 5,
      avatar: null
    },
    {
      id: 2,
      type: "points",
      myItem: "Winter Coat",
      points: 180,
      otherUser: "Mike J.",
      completedDate: "2025-01-03",
      rating: 4,
      avatar: null
    }
  ];

  // Removed type annotation from parameter
  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-emerald-100 text-emerald-700';
      case 'swapped': return 'bg-gray-100 text-gray-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Removed type annotation from parameter
  const getSwapStatusColor = (status) => {
    switch (status) {
      case 'negotiating': return 'bg-blue-100 text-blue-700';
      case 'confirmed': return 'bg-emerald-100 text-emerald-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // If user is not provided, render a loading state or null to prevent errors
  if (!user) {
      // You could render a loading spinner, a placeholder, or null
      return <div className="text-center py-10">Loading user data...</div>;
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

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-emerald-50 px-4 py-2 rounded-lg">
                <Award className="w-5 h-5 text-emerald-600" />
                {/* Use optional chaining and nullish coalescing for safety */}
                <span className="font-semibold text-emerald-600">{user?.points ?? 0} points</span>
              </div>
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-emerald-600" />
              </div>
              <button
                onClick={onLogout}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-100">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                {/* Use optional chaining and nullish coalescing for safety */}
                <h3 className="text-xl font-bold text-gray-900">{user?.name ?? 'Guest User'}</h3>
                <p className="text-gray-500 flex items-center justify-center space-x-1 mt-1">
                  <MapPin className="w-4 h-4" />
                  <span>{user?.location ?? 'Unknown Location'}</span>
                </p>
                <div className="flex justify-center items-center space-x-1 mt-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-700">{user?.rating ?? 'N/A'}</span>
                  <span className="text-sm text-gray-500">({user?.swapsCompleted ?? 0} swaps)</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-emerald-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-emerald-700 font-medium">Sustainability Score</span>
                    <Leaf className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-bold text-emerald-600">92/100</div> {/* This is hardcoded mock data */}
                  <div className="w-full bg-emerald-200 rounded-full h-2 mt-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '92%' }}></div> {/* This is hardcoded mock data */}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-gray-50 rounded-lg p-3">
                    {/* Use optional chaining and nullish coalescing for safety */}
                    <div className="text-lg font-bold text-gray-900">{user?.itemsListed ?? 0}</div>
                    <div className="text-xs text-gray-600">Items Listed</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    {/* Use optional chaining and nullish coalescing for safety */}
                    <div className="text-lg font-bold text-emerald-600">{user?.points ?? 0}</div>
                    <div className="text-xs text-gray-600">Total Points</div>
                  </div>
                </div>
              </div>

              <button
                onClick={onNavigateToListing}
                className="w-full bg-emerald-500 text-white py-3 rounded-xl hover:bg-emerald-600 transition-colors flex items-center justify-center space-x-2 font-medium"
              >
                <Plus className="w-5 h-5" />
                <span>List New Item</span>
              </button>
            </div>

            {/* Navigation */}
            <nav className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-colors flex items-center space-x-3 ${
                    activeTab === 'overview' ? 'bg-emerald-50 text-emerald-600' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <TrendingUp className="w-5 h-5" />
                  <span>Overview</span>
                </button>
                <button
                  onClick={() => setActiveTab('items')}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-colors flex items-center space-x-3 ${
                    activeTab === 'items' ? 'bg-emerald-50 text-emerald-600' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Shirt className="w-5 h-5" />
                  <span>My Items</span>
                </button>
                <button
                  onClick={() => setActiveTab('swaps')}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-colors flex items-center space-x-3 ${
                    activeTab === 'swaps' ? 'bg-emerald-50 text-emerald-600' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Swaps</span>
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-colors flex items-center space-x-3 ${
                    activeTab === 'profile' ? 'bg-emerald-50 text-emerald-600' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </button>
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-8 text-white">
                  {/* Use optional chaining for safety */}
                  <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name ?? 'Guest'}! 👋</h1>
                  <p className="text-emerald-100 mb-6">
                    You've saved 2.3 kg of textile waste this month. Keep up the great work! {/* This is hardcoded mock data */}
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white/10 rounded-xl p-4">
                       {/* Use optional chaining and nullish coalescing for safety */}
                      <div className="text-2xl font-bold">{user?.points ?? 0}</div>
                      <div className="text-emerald-100 text-sm">Available Points</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="text-2xl font-bold">{uploadedItems.filter(item => item.status === 'available').length}</div>
                      <div className="text-emerald-100 text-sm">Active Listings</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="text-2xl font-bold">{ongoingSwaps.length}</div>
                      <div className="text-emerald-100 text-sm">Ongoing Swaps</div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
                  <div className="space-y-4">
                    {/* Mock activity data - could be replaced with actual user activity */}
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                        <Plus className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Listed "Cozy Wool Sweater"</p>
                        <p className="text-sm text-gray-500">2 days ago • +20 points</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">New swap request from Sarah M.</p>
                        <p className="text-sm text-gray-500">3 days ago</p>
                      </div>
                    </div>
                    {/* Add more recent activity items as needed */}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'items' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">My Items</h2>
                  <button
                    onClick={onNavigateToListing}
                    className="bg-emerald-500 text-white px-6 py-2 rounded-xl hover:bg-emerald-600 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Item</span>
                  </button>
                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {uploadedItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-3 right-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-emerald-600 font-bold">{item.points} pts</span>
                          <span className="text-sm text-gray-500">
                            {new Date(item.dateUploaded).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500 mb-3">
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{item.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="w-4 h-4" />
                            <span>{item.likes}</span>
                          </div>
                        </div>
                        <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
                          <Edit3 className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'swaps' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Swaps</h2>

                {/* Ongoing Swaps */}
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                  <div className="flex items-center space-x-2 mb-4">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Ongoing Swaps ({ongoingSwaps.length})</h3>
                  </div>
                  <div className="space-y-4">
                    {ongoingSwaps.length > 0 ? (
                      ongoingSwaps.map((swap) => (
                        <div key={swap.id} className="border border-gray-200 rounded-xl p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center space-x-3">
                              {/* Avatar Placeholder */}
                              <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center text-gray-500 text-sm font-medium">
                                {swap.otherUser.charAt(0)} {/* Display first letter of name */}
                                {/* If swap.avatar exists, render it instead */}
                                {swap.avatar && <img src={swap.avatar} alt={swap.otherUser} className="w-full h-full rounded-full object-cover" />}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{swap.otherUser}</p>
                                <p className="text-sm text-gray-500">{swap.lastActivity}</p>
                              </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSwapStatusColor(swap.status)}`}>
                              {swap.status}
                            </span>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            {swap.type === 'direct' ? (
                              <p className="text-sm text-gray-700">
                                <span className="font-medium">Your item:</span> {swap.myItem} ↔
                                <span className="font-medium"> Their item:</span> {swap.theirItem}
                              </p>
                            ) : (
                              <p className="text-sm text-gray-700">
                                <span className="font-medium">Your item:</span> {swap.myItem} →
                                <span className="font-medium text-emerald-600"> {swap.points} points</span>
                              </p>
                            )}
                          </div>
                          <div className="flex space-x-2 mt-3">
                            <button className="flex-1 bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition-colors text-sm">
                              View Details
                            </button>
                            <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                              Message
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500">No ongoing swaps.</p>
                    )}
                  </div>
                </div>

                {/* Completed Swaps */}
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                  <div className="flex items-center space-x-2 mb-4">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Completed Swaps ({completedSwaps.length})</h3>
                  </div>
                  <div className="space-y-4">
                    {completedSwaps.length > 0 ? (
                      completedSwaps.map((swap) => (
                        <div key={swap.id} className="border border-gray-200 rounded-xl p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center space-x-3">
                               {/* Avatar Placeholder */}
                              <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center text-gray-500 text-sm font-medium">
                                {swap.otherUser.charAt(0)} {/* Display first letter of name */}
                                 {/* If swap.avatar exists, render it */}
                                 {swap.avatar && <img src={swap.avatar} alt={swap.otherUser} className="w-full h-full rounded-full object-cover" />}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{swap.otherUser}</p>
                                <p className="text-sm text-gray-500">
                                  Completed {new Date(swap.completedDate).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < swap.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="bg-emerald-50 rounded-lg p-3">
                            {swap.type === 'direct' ? (
                              <p className="text-sm text-gray-700">
                                <span className="font-medium">Swapped:</span> {swap.myItem} ↔ {swap.theirItem}
                              </p>
                            ) : (
                              <p className="text-sm text-gray-700">
                                <span className="font-medium">Sold:</span> {swap.myItem} →
                                <span className="font-medium text-emerald-600"> {swap.points} points</span>
                              </p>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                       <p className="text-center text-gray-500">No completed swaps.</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Settings</h2>
                {/* Note: In a real application, you would manage the profile data using state here */}
                {/* and add onChange handlers to make these inputs controllable. */}
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                       {/* Use optional chaining for safety and default value */}
                      <input
                        type="text"
                        value={user?.name ?? ''}
                        // Add onChange handler to make this input controllable in a real app
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        readOnly // Keeping readOnly as per original code, assumes static user data
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                       {/* Use optional chaining for safety and default value */}
                      <input
                        type="email"
                        value={user?.email ?? ''}
                         // Add onChange handler to make this input controllable in a real app
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                         readOnly // Keeping readOnly as per original code
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                       {/* Use optional chaining for safety and default value */}
                      <input
                        type="text"
                        value={user?.location ?? ''}
                         // Add onChange handler to make this input controllable in a real app
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                         readOnly // Keeping readOnly as per original code
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                       {/* Add value and onChange handler if phone is part of user state */}
                      <input
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                         value={user?.phone ?? ''} // Assuming 'phone' might exist on user object
                         // Add onChange handler to make this input controllable in a real app
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                         readOnly // Keeping readOnly as per original code
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                     {/* Add value and onChange handler if bio is part of user state */}
                    <textarea
                      rows={4}
                      placeholder="Tell others about your style and what you're looking for..."
                       value={user?.bio ?? ''} // Assuming 'bio' might exist on user object
                       // Add onChange handler to make this input controllable in a real app
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                       readOnly // Keeping readOnly as per original code
                    />
                  </div>

                  <div className="flex justify-end">
                    {/* Add onClick handler to save changes */}
                    {/* This button is currently non-functional as inputs are readOnly */}
                    <button className="bg-emerald-500 text-white px-8 py-3 rounded-xl hover:bg-emerald-600 transition-colors font-medium">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;