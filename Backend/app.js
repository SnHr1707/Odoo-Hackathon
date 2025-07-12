// ./app.js
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'; // Import cookie-parser
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './src/db/connect.js';
import { errorMiddleware } from './src/Middlewares/error.middleware.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Import all routes
import authRoutes from './src/Routes/auth.routes.js';
import itemRoutes from './src/routes/item.routes.js';
import userRoutes from './src/Routes/user.routes.js';
import adminRoutes from './src/Routes/admin.routes.js';
import swapRoutes from './src/Routes/swap.routes.js';

dotenv.config({ path: './.env' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: process.env.CORS_ORIGIN || "http://localhost:5173",
        credentials: true, // Allow cookies to be sent
        methods: ["GET", "POST", "PATCH", "DELETE"]
    }
});

app.set('io', io);

// Middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true // This is crucial for cookies
}));
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser()); // Use cookie-parser middleware
app.use(express.static(path.join(__dirname, 'public')));


// Database Connection
connectDB();

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/items', itemRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/swap', swapRoutes);

// Global Error Handling Middleware
app.use(errorMiddleware);

// Socket.io connection
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    socket.on('join_user_room', (userId) => {
        socket.join(userId);
    });
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 8000;
httpServer.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});