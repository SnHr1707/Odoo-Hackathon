import React from 'react';
import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar.jsx";

function App() {
  return (
    <div className="flex flex-col h-screen">
        {/* <Navbar /> */}
        <main className="flex-grow overflow-auto"> {/* Padding top to avoid content being hidden by sticky navbar */}
          <Outlet />
        </main>
    </div>
  );
}

export default App;