import express from "express";
import {showItems} from "../controllers/watchlistController.js";

const router = express.Router();
router.get("/", showItems);



export default router;