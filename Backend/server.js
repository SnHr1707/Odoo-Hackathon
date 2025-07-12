const express = require('express');
const dotenv = require('dotenv').config(); // Load environment variables
const connectDB = require('./config/db'); // DB connection
const cookieParser = require('cookie-parser'); // For parsing cookies
const cors = require('cors'); // For handling CORS
const authRoutes = require('./routes/authRoutes'); // Auth routes
const { notFound, errorHandler } = require('./controllers/authController'); // Import error handlers

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser()); // Parse cookies

// CORS Configuration
// Allow requests from your frontend origin and include credentials (cookies)
app.use(cors({
    origin: process.env.FRONTEND_URL, // Your frontend URL from .env
    credentials: true, // Allow sending cookies from the frontend
}));


// Mount Auth Routes
app.use('/api/auth', authRoutes);

// Add a simple root route
app.get('/', (req, res) => {
  res.send('Auth API is running...');
});

// Error handling middleware (should be last)
app.use(notFound); // Handle 404 Not Found
app.use(errorHandler); // Handle other errors

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});