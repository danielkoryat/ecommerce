const env = require("dotenv");
env.config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

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