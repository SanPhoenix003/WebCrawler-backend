import axios from "axios";
import * as cheerio from "cheerio";
import type { ISiteContent } from "../types/site-content.type.js";
import * as pageService from "./page.service.js";
import { crawlerListModel } from "../models/crawlerList.js";

export const scrapeSites = async () => {
  const linksToCrawl = await crawlerListModel.find({})
  return linksToCrawl
}

export const getScrapeSite = async (
  siteUrl: string,
  depth: number = 0,
): Promise<ISiteContent> => {
  const wiki = await axios.get(siteUrl);
  //   const wiki = await axios.get("http://books.toscrape.com/index.html");
  const $ = cheerio.load(wiki.data);
  let title = $("title").text();
  const links = $("a")
    .map((i, el) => $(el).attr("href"))
    .get();

  let data: ISiteContent = {
    url: siteUrl,
    title,
    description: "",
    childurls: links,
  };

  await pageService.generatePage(data);

  if (data?.childurls && data.childurls.length > 0) {
    for (let i = 0; i < data.childurls.length; i++) {
      const element = data.childurls[i];
      
      if (element) {
        getScrapeSite(element, depth + 1);
      }
    }
  }

  return data;
};
