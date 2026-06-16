import express from "express";
import { crawlerController } from "../controllers/crawlerController.js";

const router = express.Router();

router.get("/", crawlerController);

export default router;
