// src/middlewares/error.middleware.js
import { ApiError } from "../Utils/ApiError.js";

const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // Handle specific errors if needed, e.g., Mongoose validation error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ApiError(400, message);
    }
    
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        errors: err.errors || []
    });
};

export { errorMiddleware };