// src/main.jsx
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Page Components
import MainPage from "./Pages/Main.page.jsx";
import HomePage from "./Pages/Home.page.jsx";
import SignupPage from "./Pages/SignUp.page.jsx";
import LoginPage from "./Pages/Login.page.jsx";
import UserPage from "./Pages/User.page.jsx";
import AddItemPage from "./Pages/AddItem.page.jsx";
import ItemDetailPage from "./Pages/ItemDetail.page.jsx";
import AdminPage from "./Pages/Admin.page.jsx";
import AdminLoginPage from "./Pages/AdminLogin.page.jsx";
import AdminSignupPage from "./Pages/AdminSignup.page.jsx"; // Import the new page
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import RedirectIfAuth from "./Components/RedirectIfAuth.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <MainPage /> },
      { path: "/home", element: <HomePage /> },
      { path: "/item/:itemId", element: <ItemDetailPage /> },
      
      {
        element: <RedirectIfAuth />,
        children: [
            { path: "/login", element: <LoginPage /> },
            { path: "/signup", element: <SignupPage /> },
            { path: "/admin/login", element: <AdminLoginPage /> },
            { path: "/admin/signup", element: <AdminSignupPage /> }, // Add the new route
        ]
      },
      
      { 
        element: <ProtectedRoute />,
        children: [
          { path: "/user", element: <UserPage /> },
          { path: "/add-item", element: <AddItemPage /> },
        ]
      },

      {
        element: <ProtectedRoute adminOnly={true} />,
        children: [
          { path: "/admin", element: <AdminPage /> }
        ]
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer
      position="bottom-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  </React.StrictMode>
);