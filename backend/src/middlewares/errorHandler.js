import mongoose from "mongoose";
import CustomError from "../errors/customError.js";
import jwt from "jsonwebtoken";

const errorHandler = (err, req, res, next) => {
  // Duplicate key error (e.g., when creating a user with an existing username)
  if (err.code === 11000) {
    return res.status(409).json({ message: err.message });
  }

  // Custom error handling
  if (err instanceof CustomError) {
    // Assuming CustomeError class has a `statusCode` property you can use
    return res.status(err.statusCode).json({ message: err.message });
  }

  // Mongoose validation error (e.g., missing required fields)
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({ message: err.message });
  }

  if (err.name === "UnauthorizedError") {
    // Replace with your actual error name
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (err instanceof mongoose.Error.DocumentNotFoundError) {
    return res.status(404).json({ message: "Resource not found" });
  }

  if (err instanceof jwt.JsonWebTokenError) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  return res.status(500).json({ message: "Internal Server Error" });
};

export default errorHandler;
