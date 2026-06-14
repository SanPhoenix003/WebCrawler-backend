import type { RequestHandler } from "express";

export const getCrawlerSites: RequestHandler = (req, res) => {
  res.send("get controller running");
};
