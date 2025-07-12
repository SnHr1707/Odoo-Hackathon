
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDom from "react-dom/client";
import App from "./App.jsx";
// Uncomment imports for your page Pages
import MainPage from "./Pages/Main.page.jsx"; // Corrected component name to Mainpage
import HomePage from "./Pages/Home.page.jsx";
import AddItem from "./Pages/AddItem.page.jsx";
import ViewItemPage from "./Pages/ItemBuy.page.jsx";
import SignupPage from "./Pages/SignUp.page.jsx";
import LoginPage from "./Pages/Login.page.jsx";
import UserPage from "./Pages/User.page.jsx";
// import SettingsPage from "./Pages/Settings.page.jsx";

// Assuming you have these files in your project, uncomment these imports
// import LoginPage from "./Pages/LoginPage.jsx"; // Corrected component name to LoginPage
// import SignupPage from "./Pages/SignupPage.jsx"; // Corrected component name to SignupPage

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // Uncomment children and the Mainpage route
     children: [
       {
         path: "/", // This is the index route for the "/" path
         element: <MainPage />,
       },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/user",
        element: <UserPage />,
      },
      {
        path: "/add",
        element: <AddItem />,
      },
      {
        path: "/buy",
        element: <ViewItemPage />,
      },
     ],
  },
  // Uncomment and use your actual Login and Signup Pages here
  // Ensure LoginPage and SignupPage are imported above
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/signup",
    element: <SignupPage />
  }
]);

ReactDom.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);