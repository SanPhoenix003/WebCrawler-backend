import axios from "axios";
import * as cheerio from "cheerio";
import type { ISiteContent } from "../types/site-content.type.js";
import * as pageService from "./page.service.js";
import { crawlerListModel } from "../models/crawlerList.js";
import type { ICrawlerList } from "../types/crawler-list.type.js";
import { pageModel } from "../models/page.js";

export const scrapeSites = async () => {
  const linksToCrawl: ICrawlerList[] = await crawlerListModel.find({});

  if (linksToCrawl && linksToCrawl.length > 0) {
    for (let i = 0; i < linksToCrawl.length; i++) {
      const link = linksToCrawl[i]?.url ?? "";

      await getScrapeSite(link, 0, "/");
    }
  }
  return pageModel.find({});
};

export const getScrapeSite = async (
  crawlLink: string,
  depth: number = 0,
  newUri?: string,
  visited_links?: string[],
  currentUrl?: string,
): Promise<ISiteContent | undefined> => {
  if (depth > 3) return;
  if (!crawlLink || !newUri) return;

  let url: string =
    crawlLink[crawlLink.length - 1] === "/"
      ? crawlLink.slice(0, crawlLink.length - 1)
      : crawlLink;
  let isSameDomain: boolean;
  let isUri: boolean;

  // different domain check
  if (newUri?.includes(url)) {
    isSameDomain = false;
    isUri = false;
    url = newUri;
  }
  //uri leading character check
  else if (newUri[0] !== ".") {
    isSameDomain = true;
    isUri = true;
    if (newUri[0] === "/") {
      url = `${crawlLink}${newUri}`;
    } else {
      url = `${crawlLink}/${newUri}`;
    }
  }
  //.. check for same page routes
  else if (newUri?.includes("..")) {
    let count = (newUri.match(/\.\.\//g) || []).length + 1;
    let newUrl: string[] = [];

    if (currentUrl) {
      let splittedUrl: string[] = currentUrl.split("/");

      for (let i = 0; i < splittedUrl.length - count; i++) {
        //@ts-ignore
        newUrl.push(splittedUrl[i]);
      }

      url = newUrl.join("/");
    }
  }

  if (url && visited_links?.includes(url)) return;

  try {
    const wiki = await axios.get(`${url}`);

    if (wiki) {
      visited_links?.push(url);
    }

    //get site data
    const $ = cheerio.load(wiki.data);
    let title = $("title").text();
    const links = $("a")
      .map((i, el) => $(el).attr("href"))
      .get();

    // console.log(links);

    let data: ISiteContent = {
      url,
      title,
      description: "",
      childurls: links,
    };

    // creates page
    await pageService.generatePage(data);

    // checks urls recursively
    if (data?.childurls && data.childurls.length > 0) {
      for (let i = 0; i < data.childurls.length; i++) {
        const element = data.childurls[i];
        if (element) {
          getScrapeSite(crawlLink, depth + 1, element, visited_links, url);
        }
      }
    }
    return data;
  } catch (e: any) {
    console.log(
      "error ",
      "url ",
      url,
      "newUri ",
      newUri,
      "currentUrl ",
      currentUrl,
    );
  }
};
