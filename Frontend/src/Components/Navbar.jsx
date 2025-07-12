import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Shirt, User, LogOut, Award } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
  }

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
              <Shirt className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">ReWear</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/home" className="text-gray-600 hover:text-emerald-500 transition-colors">Browse</Link>
            <Link to="/add-item" className="text-gray-600 hover:text-emerald-500 transition-colors">List Item</Link>
          </nav>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-2 bg-emerald-50 px-3 py-1.5 rounded-lg">
                    <Award className="w-5 h-5 text-emerald-600" />
                    <span className="font-semibold text-emerald-600">{user?.points ?? 0}</span>
                </div>
                <button onClick={() => navigate('/user')} className="p-2 rounded-full hover:bg-gray-100">
                    <User className="w-5 h-5 text-gray-700" />
                </button>
                <button onClick={handleLogout} className="p-2 rounded-full hover:bg-gray-100">
                    <LogOut className="w-5 h-5 text-red-500" />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-emerald-500 transition-colors">Login</Link>
                <Link to="/signup" className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors">
                    Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;