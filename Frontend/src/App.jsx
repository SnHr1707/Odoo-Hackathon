/** @format */

import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar.jsx";

function App() {
  return (
    <div className="flex flex-col h-screen">
        {/* Navbar is part of the main layout */}
        <Navbar />
        {/* Outlet will render the matched child route component */}
        <div className="flex-grow overflow-auto "> {/* Added overflow-auto for scrollable content */}
          <Outlet />
        </div>
    </div>
  );
}

export default App;