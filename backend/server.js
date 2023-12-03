import env from "dotenv";
env.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import corsOptionsConfig from "./src/config/corsOptions.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import notFound from "./src/middlewares/notFound.js";
import userRouter from "./src/routes/user.js";
import productRouter from "./src/routes/product.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3001;
const BASE_URL = process.env.BASE_URL;

app.use(cors(corsOptionsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(`${BASE_URL}/user`, userRouter);
app.use(`${BASE_URL}/product`, productRouter);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT} and connected to MongoDB`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
