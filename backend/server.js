import env from "dotenv";
env.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

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