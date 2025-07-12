import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from "./src/Middlewares/error.middleware.js";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173', // Provide a fallback for local dev
    credentials: true
}));

// Increase payload size limit for Base64 image uploads
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static("public"));
app.use(cookieParser());

// --- Import Routers with standardized paths ---
import authRouter from './src/Routes/auth.routes.js';
import itemRouter from './src/routes/item.routes.js';
import adminRouter from './src/Routes/admin.routes.js';
import userRouter from './src/Routes/user.routes.js';
import swapRouter from './src/Routes/swap.routes.js';

// --- Use Routers ---
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/items", itemRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/swap", swapRouter);

// --- Error Handling Middleware ---
// This should be the last middleware added
app.use(errorMiddleware);

// Export the configured app instance
export { app };