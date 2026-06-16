import type { RequestHandler } from "express";
import * as scraperService from "../services/scraper.service.js";

export const crawlerController: RequestHandler = async (req, res) => {
  const linksToCrawl = await scraperService.scrapeSites();
  res.send(linksToCrawl);
};
