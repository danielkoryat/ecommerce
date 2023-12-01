import env from "dotenv";
env.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import corsOptionsConfig from "./config/corsOptions.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors(corsOptionsConfig));
app.use(express.urlencoded({ extended: true }));
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