import express from "express";
import cors from "cors";
import { connectDb } from "./src/config/db.js";
import router from "./src/routes/crawlerRoute.js";
import * as cheerio from "cheerio";
import axios from "axios";

const app = express();

connectDb();

app.use(cors());
app.use(express.json(), express.urlencoded({ extended: true }));

app.use("/crawler", router);

// app.use("/", async (req, res) => {
//   await crawlerListModel.create({
//     url: "https://www.wikipedia.org/",
//   });
// });

app.use("/", async (req, res) => {
  const wiki = await axios.get("http://books.toscrape.com/", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const $ = cheerio.load(wiki.data);
  let title = $('title').text();
  
  res.status(200).json({
    data: title,
  });
});

app.listen(3000, () => {
  console.log("server running at 3000");
});
