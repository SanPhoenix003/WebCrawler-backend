import express from "express";
import { getCrawler } from "../controllers/crawlerController.js";

const router = express.Router();

router.get("/", getCrawler);

export default router;
