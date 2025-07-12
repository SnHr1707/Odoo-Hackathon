import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import Home from '../Components/Home';

function HomePage() {
  return (
        <div className="flex flex-col h-screen">
        {/* Navbar is part of the main layout */}
        < Navbar/>
        {/* Outlet will render the matched child route component */}
        <div className="flex-grow overflow-auto "> {/* Added overflow-auto for scrollable content */}
          <Home />
        </div>
    </div>
  );
}

export default HomePage;