import { crawlerListModel } from "../models/crawlerList.js";

export const getLinksToCrawl = async () => {
  try {
    const links = await crawlerListModel.find({});
    return links;
  } catch (e: any) {
    console.log("error ", e);
  }
};
