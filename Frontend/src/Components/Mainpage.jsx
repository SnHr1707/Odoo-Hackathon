import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Mail,
  Lock,
  User,
  MapPin,
  Plus,
  Search,
  Filter,
  Star,
  MessageCircle,
  Award,
  Leaf,
  Shirt,
  Settings,
  LogOut,
  ArrowRight,
  Recycle,
  Users,
  Repeat,
  Upload,
  Heart,
  Instagram,
  Twitter,
  Facebook
} from 'lucide-react';

// Helper function for conditional classes
const getColorClasses = (color) => {
  const colorMap = {
    emerald: "bg-emerald-100 text-emerald-600",
    blue: "bg-blue-100 text-blue-600",
    orange: "bg-orange-100 text-orange-600",
    purple: "bg-purple-100 text-purple-600",
    green: "text-green-600", // Added for Stats component
  };
  return colorMap[color];
};

// AuthModal Component (combined) - Kept for potential future use, though login navigation is handled by router now.
const AuthModal = ({ onClose, onAuth }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    location: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate authentication
    const user = {
      id: 1,
      name: formData.name || 'John Doe',
      email: formData.email,
      points: 150,
      location: formData.location || 'New York, NY',
      avatar: null,
      itemsListed: 12,
      swapsCompleted: 8,
      rating: 4.8
    };
    onAuth(user);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {isLogin ? 'Welcome Back' : 'Join ReWear'}
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter your name"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="City, State"
                    required
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-emerald-500 text-white py-3 rounded-lg font-medium hover:bg-emerald-600 transition-colors"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-emerald-500 font-medium hover:text-emerald-600 transition-colors"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>

          {!isLogin && (
            <div className="mt-4 p-4 bg-emerald-50 rounded-lg">
              <p className="text-sm text-emerald-700">
                🎉 Get 50 welcome points when you create your account and list your first item!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Dashboard Component (combined, simplified for MainPage context)
const Dashboard = ({ user, onNavigateToListing, onLogout }) => {
    // This dashboard component is not intended to be fully functional within MainPage,
    // it's just included here as requested.
    // In a real app, this would be a separate route/page.
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-3xl font-bold">Dashboard Content (Placeholder)</h1>
        <p>Welcome, {user?.name}!</p> {/* Use optional chaining */}
        <button onClick={onLogout} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">Logout</button>
        <button onClick={onNavigateToListing} className="mt-4 ml-4 px-4 py-2 bg-emerald-500 text-white rounded">List New Item</button>
         <p className="mt-4 text-sm text-gray-600">Note: The full interactive dashboard is intended for a separate route.</p>
      </div>
    );
  };

// FeaturedItems Component (combined)
const FeaturedItems = ({ user, onNavigateToLogin }) => { // Receive user and login handler
  const items = [
    {
      id: 1,
      title: "Designer Silk Blouse",
      brand: "Zara",
      size: "M",
      condition: "Like New",
      points: 150,
      image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400",
      user: "Sarah M.",
      rating: 4.9,
      swapType: "points"
    },
    {
      id: 2,
      title: "Vintage Leather Boots",
      brand: "Dr. Martens",
      size: "8",
      condition: "Good",
      points: 200,
      image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400",
      user: "Mike K.",
      rating: 4.8,
      swapType: "direct"
    },
    {
      id: 3,
      title: "Cozy Knit Sweater",
      brand: "H&M",
      size: "L",
      condition: "Excellent",
      points: 80,
      image: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=400",
      user: "Emma J.",
      rating: 5.0,
      swapType: "points"
    },
    {
      id: 4,
      title: "Formal Black Dress",
      brand: "ASOS",
      size: "S",
      condition: "Like New",
      points: 120,
      image: "https://images.pexels.com/photos/1061588/pexels-photo-1061588.jpeg?auto=compress&cs=tinysrgb&w=400",
      user: "Lisa R.",
      rating: 4.7,
      swapType: "both"
    }
  ];

  const handleItemAction = () => {
    if (!user) {
        onNavigateToLogin();
    } else {
        // Handle contact owner or other item actions if logged in
        console.log('Contact owner or view item details (if logged in)');
    }
  };

  const handleViewAllItems = () => {
     if (!user) {
         onNavigateToLogin();
     } else {
         // Handle viewing all items if logged in
         console.log('Navigate to all items page (if logged in)');
     }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Items
          </h2>
          <p className="text-xl text-gray-600">
            Discover amazing pieces from our community
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Heart button - also requires login */}
                <button
                   onClick={handleItemAction} // Use the action handler
                   className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <Heart className="w-4 h-4 text-gray-600" />
                </button>
                <div className="absolute bottom-3 left-3">
                  {item.swapType === 'points' && (
                    <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {item.points} pts
                    </span>
                  )}
                  {item.swapType === 'direct' && (
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Direct Swap
                    </span>
                  )}
                  {item.swapType === 'both' && (
                    <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Both Options
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{item.brand} • Size {item.size}</p>
                <p className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full inline-block mb-3">
                  {item.condition}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                    <span className="text-sm text-gray-600">{item.user}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{item.rating}</span>
                  </div>
                </div>

                {/* Contact Owner button - requires login */}
                <button
                   onClick={handleItemAction} // Use the action handler
                   className="w-full mt-4 bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Contact Owner</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          {/* View All Items button - requires login */}
          <button
            onClick={handleViewAllItems} // Use the handler
            className="bg-emerald-500 text-white px-8 py-3 rounded-xl font-medium hover:bg-emerald-600 transition-colors"
          >
            View All Items
          </button>
        </div>
      </div>
    </section>
  );
};

// Header Component (combined and modified for navigation)
const Header = ({ user, onNavigateToLogin, onNavigateToDashboard }) => {
    // No need for useNavigate here as we're getting the handler via props
    // const navigate = useNavigate();

    const handleJoinReWearClick = () => {
        if (!user) {
            onNavigateToLogin(); // Navigate to /login if not logged in
        } else {
             // If logged in, maybe open a user menu or go to dashboard?
             onNavigateToDashboard();
        }
    };

    const handleDashboardClick = () => {
       if (user) {
         onNavigateToDashboard(); // Assuming onNavigateToDashboard controls displaying the dashboard section
       } else {
         onNavigateToLogin(); // If not logged in, navigate to /login
       }
    };


  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
              <Shirt className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">ReWear</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {/* Standard anchor links for smooth scrolling */}
            <a href="#how-it-works" className="text-gray-600 hover:text-emerald-500 transition-colors">How It Works</a>
            <a href="#sustainability" className="text-gray-600 hover:text-emerald-500 transition-colors">Impact</a>
             {/* Assuming a community section with id="community" exists */}
            <a href="#community" className="text-gray-600 hover:text-emerald-500 transition-colors">Community</a>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleDashboardClick} // Use the handler
                  className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>{user.points} points</span>
                </div>
              </div>
            ) : (
              <button
                onClick={handleJoinReWearClick} // Use the handler to navigate to /login
                className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 transition-colors"
              >
                Join ReWear
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

// Hero Component (combined and modified for navigation)
const Hero = ({ user, onNavigateToLogin }) => { // Receive user and login handler
    // No need for useNavigate here as we're getting the handler via props
    // const navigate = useNavigate();

    const handleStartSwappingClick = () => {
        if (!user) {
            onNavigateToLogin(); // Navigate to /login if not logged in
        } else {
            // Handle action if logged in, e.g., go to dashboard list item section
            console.log('Navigate to List Item section of Dashboard (if logged in)');
        }
    };

     const handleBrowseItemsClick = () => {
         if (!user) {
             onNavigateToLogin(); // Navigate to /login if not logged in
         } else {
             // Handle action if logged in, e.g., go to dashboard browse items section
             console.log('Navigate to Browse Items section of Dashboard (if logged in)');
         }
     };


  return (
    <section className="pt-24 pb-12 bg-gradient-to-br from-emerald-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Swap. Share.
              <span className="text-emerald-500"> Sustain.</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 leading-relaxed">
              Transform your closet into a sustainable fashion hub. Exchange unused clothing through direct swaps or our innovative point system.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {/* Start Swapping Button - requires login */}
              <button
                onClick={handleStartSwappingClick} // Use the handler
                className="bg-emerald-500 text-white px-8 py-4 rounded-xl font-medium text-lg hover:bg-emerald-600 transition-all duration-200 flex items-center justify-center space-x-2 group"
              >
                <span>Start Swapping</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              {/* Browse Items Button - requires login */}
              <button
                 onClick={handleBrowseItemsClick} // Use the handler
                 className="border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-medium text-lg hover:border-emerald-500 hover:text-emerald-500 transition-colors"
              >
                Browse Items
              </button>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Recycle className="w-6 h-6 text-emerald-500" />
                </div>
                <p className="text-sm font-medium text-gray-900">Eco-Friendly</p>
                <p className="text-xs text-gray-500">Reduce waste</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-orange-500" />
                </div>
                <p className="text-sm font-medium text-gray-900">Community</p>
                <p className="text-xs text-gray-500">Connect & swap</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-purple-500" />
                </div>
                <p className="text-sm font-medium text-gray-900">Rewards</p>
                <p className="text-xs text-gray-500">Earn points</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-4 shadow-lg">
                  <img
                    src="https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Vintage jacket"
                    className="w-full h-48 object-cover rounded-xl"
                  />
                  <div className="mt-3">
                    <p className="font-medium text-gray-900">Vintage Denim Jacket</p>
                    <p className="text-sm text-emerald-500">120 points</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-white rounded-2xl p-4 shadow-lg">
                  <img
                    src="https://images.pexels.com/photos/1020585/pexels-photo-1020585.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Summer dress"
                    className="w-full h-48 object-cover rounded-xl"
                  />
                  <div className="mt-3">
                    <p className="font-medium text-gray-900">Floral Summer Dress</p>
                    <p className="text-sm text-orange-500">Direct swap</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 bg-emerald-500 text-white p-3 rounded-full">
              <Recycle className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


// HowItWorks Component (combined)
const HowItWorks = ({ user, onNavigateToLogin }) => { // Receive user and login handler
  const steps = [
    {
      icon: Upload,
      title: "List Your Items",
      description: "Upload photos and details of clothing you no longer wear. Each item earns you points when listed.",
      color: "emerald"
    },
    {
      icon: Search,
      title: "Browse & Discover",
      description: "Explore thousands of items from our community. Filter by size, style, brand, and location.",
      color: "blue"
    },
    {
      icon: MessageCircle,
      title: "Connect & Negotiate",
      description: "Message other users to arrange direct swaps or use your points to claim items you love.",
      color: "orange"
    },
    {
      icon: Repeat,
      title: "Swap & Repeat",
      description: "Complete exchanges and earn more points. The more you participate, the more you save and earn.",
      color: "purple"
    }
  ];

   const handleGetStartedClick = () => {
      if (!user) {
          onNavigateToLogin(); // Navigate to /login if not logged in
      } else {
          // Handle action if logged in, e.g., go to dashboard list item section
          console.log('Navigate to List Item section of Dashboard (if logged in)');
      }
   };


  return (
    <section id="how-it-works" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How ReWear Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our circular fashion economy in four simple steps. It's sustainable, rewarding, and fun!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              <div className={`w-16 h-16 rounded-2xl ${getColorClasses(step.color)} flex items-center justify-center mx-auto mb-6`}>
                <step.icon className="w-8 h-8" />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-8 h-0.5 bg-gray-200 transform -translate-x-4"></div>
              )}

              <div className="absolute -top-2 -left-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Start Your Sustainable Fashion Journey?
          </h3>
          <p className="text-emerald-100 mb-6">
            Join thousands of fashion lovers who are making a difference, one swap at a time.
          </p>
          {/* Get Started Today Button - requires login */}
          <button
             onClick={handleGetStartedClick} // Use the handler
             className="bg-white text-emerald-600 px-8 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
};


// ItemListing Component (combined, simplified for MainPage context)
const ItemListing = ({ user, onBack }) => {
    // This component is not intended to be fully functional within MainPage,
    // it's just included here as requested.
    // In a real app, this would be a separate route/page or modal.
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <h1 className="text-3xl font-bold">Item Listing Page (Placeholder)</h1>
            <p>Prepare to list an item, {user?.name}.</p> {/* Use optional chaining */}
            <button onClick={onBack} className="mt-4 px-4 py-2 bg-gray-300 text-gray-700 rounded">Back to Main</button>
             <p className="mt-4 text-sm text-gray-600">Note: The full item listing form is intended for a separate route or modal.</p>
        </div>
    );
};

// Stats Component (combined)
const Stats = () => {
  const stats = [
    {
      icon: Shirt,
      value: "50,000+",
      label: "Items Exchanged",
      description: "Garments given new life",
      color: "emerald"
    },
    {
      icon: Users,
      value: "12,000+",
      label: "Active Members",
      description: "Growing community",
      color: "blue"
    },
    {
      icon: Leaf,
      value: "15 tons",
      label: "Waste Prevented",
      description: "CO2 emissions saved",
      color: "green"
    },
    {
      icon: Award,
      value: "2.5M",
      label: "Points Earned",
      description: "Community rewards",
      color: "orange"
    }
  ];


  return (
    <section id="sustainability" className="py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Impact Together
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Every swap makes a difference. See how our community is transforming fashion sustainability.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`w-16 h-16 ${getColorClasses(stat.color)} bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                <stat.icon className="w-8 h-8" />
              </div>

              <div className="text-3xl md:text-4xl font-bold mb-2">
                {stat.value}
              </div>

              <h3 className="text-lg font-semibold mb-2">
                {stat.label}
              </h3>

              <p className="text-gray-400 text-sm">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              Fashion Revolution Starts Here
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              The fashion industry is one of the world's largest polluters. ReWear is changing that narrative by creating a circular economy where every garment gets multiple lives, reducing waste and environmental impact.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-gray-300">80% reduction in textile waste per user</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-gray-300">Average 15 new items per member annually</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-gray-300">Community-driven sustainability rewards</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-emerald-500/20 to-orange-500/20 rounded-2xl p-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-emerald-400 mb-2">98%</div>
                <p className="text-lg font-medium mb-4">User Satisfaction</p>
                <p className="text-gray-300 text-sm">
                  "ReWear has completely changed how I think about fashion. I love giving my clothes new life!" - Sarah K.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


// Footer Component (combined)
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                <Shirt className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">ReWear</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Transforming fashion through sustainable swaps and community connections. Join the circular fashion revolution.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Platform</h3>
            <ul className="space-y-3">
              {/* Standard anchor links for smooth scrolling */}
              <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Browse Items</a></li> {/* This might need login check depending on where it links */}
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Point System</a></li> {/* This might link to a page requiring login */}
              <li><a href="#sustainability" className="text-gray-400 hover:text-white transition-colors">Sustainability</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Safety Guidelines</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community Rules</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Get updates on new features and sustainability tips.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-emerald-500"
              />
              <button className="px-4 py-2 bg-emerald-500 text-white rounded-r-lg hover:bg-emerald-600 transition-colors">
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © 2025 ReWear. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};


// MainPage Component (combining all sections)
const MainPage = () => {
  // Consider using a state management library or Context API for 'user' in a real app
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false); // Still manage modal visibility
  const [view, setView] = useState('landing'); // 'landing', 'dashboard', 'listing'

  const navigate = useNavigate(); // Initialize useNavigate

  // Simulate user login for demonstration
   useEffect(() => {
    // In a real app, you'd check local storage or a cookie here
    // to see if a user is already logged in.
     const loggedInUser = localStorage.getItem('loggedInUser');
     if (loggedInUser) {
        try {
            setUser(JSON.parse(loggedInUser));
        } catch (e) {
            console.error("Failed to parse user from localStorage", e);
            localStorage.removeItem('loggedInUser'); // Clear invalid data
        }
     }
   }, []); // Run once on component mount


  const handleAuthOpen = () => {
    setShowAuthModal(true);
  };

  const handleAuthClose = () => {
    setShowAuthModal(false);
  };

  const handleAuth = (authenticatedUser) => {
    setUser(authenticatedUser);
    setShowAuthModal(false);
    localStorage.setItem('loggedInUser', JSON.stringify(authenticatedUser)); // Simulate saving user
    // Decide where to navigate after auth - maybe dashboard or back to landing
    setView('dashboard'); // Navigate to dashboard after login
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('loggedInUser'); // Simulate logging out
    setView('landing'); // Go back to landing page
  };

  const handleNavigateToListing = () => {
    if (user) {
      setView('listing');
    } else {
      navigate('/login');
    }
  };

  const handleBackFromListing = () => {
    setView('dashboard'); // Go back to dashboard from listing
  };

   const handleNavigateToDashboard = () => {
      if (user) {
         setView('dashboard');
      } else {
         navigate('/login');
      }
   };

   // This handler is specifically for navigating to the Login *page* using the router
   const handleNavigateToLoginPage = () => {
     navigate('/login');
   };


  // Determine what content to show based on state
  let mainContent;
  if (view === 'listing' && user) {
      mainContent = <ItemListing user={user} onBack={handleBackFromListing} />;
  } else if (view === 'dashboard' && user) {
      mainContent = <Dashboard user={user} onNavigateToListing={handleNavigateToListing} onLogout={handleLogout} />;
  }
  else {
      // Default landing page content
      mainContent = (
          <>
              {/* Pass login handler and user state */}
              <Hero user={user} onNavigateToLogin={handleNavigateToLoginPage} />
               {/* Pass login handler and user state to components with buttons */}
              <FeaturedItems user={user} onNavigateToLogin={handleNavigateToLoginPage} />
              <HowItWorks user={user} onNavigateToLogin={handleNavigateToLoginPage} />
              <Stats />
              <Footer /> {/* Footer links are standard anchors */}
          </>
      );
  }


  return (
    <div className="flex flex-col min-h-screen">
      {/* Pass login handler and user state to Header */}
      <Header user={user} onAuthOpen={handleAuthOpen} onNavigateToDashboard={handleNavigateToDashboard} onNavigateToLogin={handleNavigateToLoginPage} />

      <main className="flex-grow pt-16"> {/* Add padding-top equal to header height */}
        {mainContent}
      </main>

      {/* AuthModal is now triggered by state, maybe remove if only using router login page */}
      {showAuthModal && <AuthModal onClose={handleAuthClose} onAuth={handleAuth} />}
    </div>
  );
};

export default MainPage;