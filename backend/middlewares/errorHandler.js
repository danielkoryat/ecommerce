import CustomeError from "../errors/customeError.js";
import mongoose from "mongoose";
const isMongooseError = (err) => {
  return (
    err instanceof mongoose.Error.ValidationError ||
    err instanceof mongoose.Error.CastError ||
    err instanceof mongoose.Error.VersionError ||
    err instanceof mongoose.Error.DocumentNotFoundError ||
    err instanceof mongoose.Error.MongooseServerSelectionError ||
    err instanceof mongoose.Error.MissingSchemaError ||
    // Check for any other specific Mongoose error types you want to handle
    err.name === "MongoError" || // For MongoDB driver errors
    err.name === "MongoServerError"
  ); // For MongoDB server errors
};

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomeError || isMongooseError(err)) {
    return res.status(400).json({ message: err.message });
  }
  return res.status(500).json({ message: "Something went wrong" });
};
export default errorHandler;
