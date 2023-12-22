import mongoose from "mongoose";
import CustomError from "../errors/customError.js";
import jwt from "jsonwebtoken";

const errorHandler = (err, req, res, next) => {
  let status = 500; // Default to internal server error
  let message = "Internal Server Error";

  // Duplicate key error (e.g., when creating a user with an existing username)
  if (err.code === 11000) {
    status = 409;
    message = err.message;
  }
  // Custom error handling
  else if (err instanceof CustomError) {
    status = err.statusCode;
    message = err.message;
  }
  // Mongoose validation error (e.g., missing required fields)
  else if (err instanceof mongoose.Error.ValidationError) {
    status = 400;
    message = err.message;
  }
  // Unauthorized errors (e.g., invalid token or no token)
  else if (err instanceof jwt.JsonWebTokenError || err.name === "UnauthorizedError") {
    status = 401;
    message = "Unauthorized";
  }
  // Resource not found error
  else if (err instanceof mongoose.Error.DocumentNotFoundError) {
    status = 404;
    message = "Resource not found";
  }

  res.status(status).json({ message });
};

export default errorHandler;