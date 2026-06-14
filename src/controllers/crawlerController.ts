import type { RequestHandler } from "express";

export const getCrawler: RequestHandler = (req, res) => {
  res.send("get controller running");
};
