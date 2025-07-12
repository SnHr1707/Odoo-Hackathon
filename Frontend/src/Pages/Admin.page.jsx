import React, { useState } from 'react';
import AdminPanelPage from '../Components/AdminPanel'; // Adjust the path as needed

// This page component will simply render the AdminPanelPage component.
// In a real application, routing would determine when this page is shown.

// Mock User Data (if you need to pass admin user info, though the panel itself
// might not strictly require it for simple moderation actions)
const mockAdminUser = {
    id: 99,
    name: "Admin User",
    role: "admin",
    // ... other admin properties
};

const AdminPanel = () => {
    // State to manage the list of items in this parent component (optional,
    // you could manage item state within AdminPanelPage if it's standalone,
    // but often item data would be managed higher up).
    const [itemsToModerate, setItemsToModerate] = useState([
        // Mock data for items needing moderation
        {
            id: 10,
            title: "Floral Print Blouse",
            description: "Light and airy floral blouse, size S. Brand new.",
            images: ["https://images.pexels.com/photos/1018911/pexels-photo-1018911.jpeg?auto=compress&cs=tinysrgb&w=300"],
            status: "pending", // Status indicating it needs review
            method: "points",
            points: 200,
            uploader: { id: 201, name: "Alice B.", location: "City A" },
            dateListed: "2025-03-01"
        },
        {
            id: 11,
            title: "Men's Casual Shirt",
            description: "Blue casual shirt, size M. Excellent condition.",
            images: ["https://images.pexels.com/photos/16170/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=300"],
            status: "pending",
            method: "swap",
            points: null,
            uploader: { id: 202, name: "Bob C.", location: "City B" },
            dateListed: "2025-03-02"
        },
         {
            id: 12,
            title: "Vintage Leather Jacket",
            description: "Cool vintage jacket, well-worn with character.",
            images: ["https://images.pexels.com/photos/2161347/pexels-photo-2161347.jpeg?auto=compress&cs=tinysrgb&w=300"],
            status: "pending",
            method: "both",
            points: 500,
            uploader: { id: 203, name: "Charlie D.", location: "City C" },
            dateListed: "2025-03-03"
        },
         // Add some mock items that are already available or rejected to test filtering/removal
         {
            id: 13,
            title: "Silk Scarf",
            description: "Beautiful silk scarf.",
            images: ["https://images.pexels.com/photos/1342609/pexels-photo-1342609.jpeg?auto=compress&cs=tinysrgb&w=300"],
            status: "available", // Already approved
            method: "points",
            points: 150,
            uploader: { id: 201, name: "Alice B.", location: "City A" },
            dateListed: "2025-02-20"
         },
         {
            id: 14,
            title: "Suspicious Item", // Example of something that might be rejected
            description: "Definitely not clothing. Spam?",
            images: ["https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=300"], // Example of a non-clothing image
            status: "pending",
            method: "points",
            points: 1000,
            uploader: { id: 204, name: "Spammy User", location: "City D" },
            dateListed: "2025-03-04"
         },
           {
            id: 15,
            title: "Rejected Item Example",
            description: "This item was previously rejected.",
            images: ["https://images.pexels.com/photos/7674846/pexels-photo-7674846.jpeg?auto=compress&cs=tinysrgb&w=300"],
            status: "rejected", // Example of a rejected item
            method: "swap",
            points: null,
            uploader: { id: 205, name: "Elena F.", location: "City E" },
            dateListed: "2025-02-28"
         },
    ]);

    // In a real app, these actions would likely update backend data,
    // and the component would re-fetch or receive updated data via state management.
    const handleApproveItem = (itemId) => {
        console.log("Simulating Approve:", itemId);
        setItemsToModerate(prevItems =>
            prevItems.map(item =>
                item.id === itemId ? { ...item, status: 'available' } : item
            )
        );
    };

    const handleRejectItem = (itemId) => {
         console.log("Simulating Reject:", itemId);
         setItemsToModerate(prevItems =>
            prevItems.map(item =>
                item.id === itemId ? { ...item, status: 'rejected' } : item
            )
        );
    };

    const handleRemoveItem = (itemId) => {
         console.log("Simulating Remove:", itemId);
         setItemsToModerate(prevItems =>
            prevItems.filter(item => item.id !== itemId)
        );
    };


    // You could pass the admin user object if needed within the panel component
    const adminUser = mockAdminUser; // Using mock data

    return (
        <div>
            {/* Pass the items data and action handlers to the AdminPanelPage component */}
            <AdminPanelPage
                items={itemsToModerate} // Pass the mock item data
                onApprove={handleApproveItem}
                onReject={handleRejectItem}
                onRemove={handleRemoveItem}
                 // adminUser={adminUser} // Pass admin user if needed for display/permissions within panel
            />
        </div>
    );
};

export default AdminPanel;