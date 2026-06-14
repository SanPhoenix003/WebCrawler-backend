import express from "express";
import { getCrawlerSites } from "../controllers/crawlerController.js";

const router = express.Router();

router.get("/", getCrawlerSites);

export default router;
