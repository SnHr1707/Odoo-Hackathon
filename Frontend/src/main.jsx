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
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import RedirectIfAuth from "./Components/RedirectIfAuth.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App is now the root layout component
    children: [
      { path: "/", element: <MainPage /> },
      { path: "/home", element: <HomePage /> },
      { path: "/item/:itemId", element: <ItemDetailPage /> },
      
      // Routes for unauthenticated users that redirect if logged in
      {
        element: <RedirectIfAuth />,
        children: [
            { path: "/login", element: <LoginPage /> },
            { path: "/signup", element: <SignupPage /> },
        ]
      },
      
      // User Protected Routes
      { 
        element: <ProtectedRoute />,
        children: [
          { path: "/user", element: <UserPage /> },
          { path: "/add-item", element: <AddItemPage /> },
        ]
      },

      // Admin Protected Routes
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
    {/* ToastContainer can live outside the router */}
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </React.StrictMode>
);