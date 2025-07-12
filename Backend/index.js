import dotenv from 'dotenv';
import connectDB from './src/db/connect.js';
import { app } from './app.js';

// Configure dotenv to load environment variables from the .env file
dotenv.config({
  path: './.env'
});

const port = process.env.PORT || 8000;

// Connect to the database and then start the server
connectDB()
  .then(() => {
    // Optional: Add an error listener on the app for Express-related errors
    // that might occur before the request pipeline.
    app.on('error', (error) => {
        console.error("EXPRESS APP ERROR: ", error);
        throw error;
    });

    // Start listening for requests
    app.listen(port, () => {
        console.log(`✅ Server is running successfully on port: ${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed! Server will not start.", err);
    process.exit(1); 
  });