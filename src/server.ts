import express from "express";
import cors from "cors";
import { connectDb } from "./config/db.js";
import router from "./routes/crawlerRoute.js";
import * as cheerio from "cheerio";
import axios from "axios";
import { getScrapeSite } from "./services/scraper.service.js";
import { crawlerListModel } from "./models/crawlerList.js";

const app = express();

connectDb();

app.use(cors());
app.use(express.json(), express.urlencoded({ extended: true }));

app.use("/crawler", router);

// to add a link in crawl lists
app.get("/", async (req, res) => {
  try {
    const data = await crawlerListModel.create({
      url: "http://books.toscrape.com/",
    });

    console.log(data);

    res.send(data);
  } catch (e: any) {
    console.log("error ", e);
  }
});

app.listen(3000, () => {
  console.log("server running at 3000");
});
