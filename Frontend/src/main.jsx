import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Page Components
import MainPage from "./Pages/Main.page.jsx";
import HomePage from "./Components/Home.jsx";
import AddItem from "./Pages/AddItem.page.jsx";
import ViewItemPage from "./Pages/ItemBuy.page.jsx";
import SignupPage from "./Pages/SignUp.page.jsx";
import LoginPage from "./Pages/Login.page.jsx";
import UserPage from "./Pages/User.page.jsx";
// import AddItemPage from "./Pages/AddItem.page.jsx";
import ItemDetailPage from "./Pages/ItemDetail.page.jsx";
// import AdminLoginPage from "./Pages/AdminLogin.page.jsx";
// import AdminDashboardPage from "./Pages/AdminDashboard.page.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";

import AdminPage from "./Pages/Admin.page.jsx";
// import SettingsPage from "./Pages/Settings.page.jsx";

// Assuming you have these files in your project, uncomment these imports
// import LoginPage from "./Pages/LoginPage.jsx"; // Corrected component name to LoginPage
// import SignupPage from "./Pages/SignupPage.jsx"; // Corrected component name to SignupPage


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <MainPage /> },
      { path: "/item/:itemId", element: <ItemDetailPage /> },
      {
        path: "/add",
        element: <AddItem />,
      },
      {
        path: "/buy",
        element: <ViewItemPage />,
      },{
        path: "/admin",
        element: <AdminPage />,
      },
      
      // User Protected Routes
      { 
        element: <ProtectedRoute />,
        children: [
          { path: "/user", element: <UserPage /> },
          { path: "/home", element: <HomePage /> },
          // { path: "/add-item", element: <AddItemPage /> },
        ]
      },

      // Admin Protected Routes
      // {
      //   element: <ProtectedRoute adminOnly={true} />,
      //   children: [
      //     { path: "/admin/dashboard", element: <AdminDashboardPage /> }
      //   ]
      // },
    ],
//      ],
  },
  // Uncomment and use your actual Login and Signup Pages here
  // Ensure LoginPage and SignupPage are imported above
  {
    path: "/login",
    element: <LoginPage />

  },
  // Standalone auth routes
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
  // { path: "/admin/login", element: <AdminLoginPage /> },
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