import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Page Components
import MainPage from "./Pages/Main.page.jsx";
import HomePage from "./Pages/Home.page.jsx";
import SignupPage from "./Pages/SignUp.page.jsx";
import LoginPage from "./Pages/Login.page.jsx";
import UserPage from "./Pages/User.page.jsx";
// import AddItemPage from "./Pages/AddItem.page.jsx";
import ItemDetailPage from "./Pages/ItemDetail.page.jsx";
// import AdminLoginPage from "./Pages/AdminLogin.page.jsx";
// import AdminDashboardPage from "./Pages/AdminDashboard.page.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <MainPage /> },
      { path: "/home", element: <HomePage /> },
      { path: "/item/:itemId", element: <ItemDetailPage /> },
      
      // User Protected Routes
      { 
        element: <ProtectedRoute />,
        children: [
          { path: "/user", element: <UserPage /> },
          // { path: "/add-item", element: <AddItemPage /> },
        ]
      },

      // Admin Protected Routes
      {
        element: <ProtectedRoute adminOnly={true} />,
        children: [
          { path: "/admin/dashboard", element: <AdminDashboardPage /> }
        ]
      },
    ],
  },
  // Standalone auth routes
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
  { path: "/admin/login", element: <AdminLoginPage /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </AuthProvider>
  </React.StrictMode>
);