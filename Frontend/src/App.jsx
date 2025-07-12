import React from 'react';
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx"; // Ensure correct path to Navbar
import { AuthProvider } from './context/AuthContext.jsx'; // Import the AuthProvider

function App() {
  return (
    // AuthProvider now wraps the entire application within the Router's context
    <AuthProvider>
      <div className="flex flex-col h-screen">
          <Navbar />
          {/* The main content area now handles its own scrolling */}
          <main className="flex-grow overflow-y-auto bg-gray-50">
            <Outlet />
          </main>
      </div>
    </AuthProvider>
  );
}

export default App;