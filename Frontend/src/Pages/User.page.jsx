import React from 'react';
import UserDashboard from '../Components/User';

// Define a mock user object
const mockUser = {
  id: 1, // Add an ID just in case
  name: "Frontend User", // Use a placeholder name
  points: 750, // Assign some mock points
  location: "Mock City, CA", // Mock location
  rating: 4.9, // Mock rating
  swapsCompleted: 25, // Mock completed swaps
  itemsListed: 10, // Mock items listed
  email: "frontend.user@example.com", // Mock email
  phone: "+1 (123) 456-7890", // Optional: Mock phone
  bio: "Exploring sustainable fashion!" // Optional: Mock bio
  // Add any other properties your UserDashboard component expects
};

const UserPage = () => { // Replace App with the name of your actual parent component
  const handleNavigateToListing = () => {
    console.log("Navigate to listing clicked (frontend mock)");
    // Add your frontend navigation logic here
  };

  const handleLogout = () => {
    console.log("Logout clicked (frontend mock)");
    // Add your frontend logout logic here (e.g., clear mock user, redirect)
  };

  return (
    <div>
      {/* Render the UserDashboard component, passing the mock user */}
      <UserDashboard
        user={mockUser} // Pass the mock user object here
        onNavigateToListing={handleNavigateToListing}
        onLogout={handleLogout}
      />
    </div>
  );
};

export default UserPage;