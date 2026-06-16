import { pageModal } from "../models/page.js";
import type { ISiteContent } from "../types/site-content.type.js";

export const createPage = async (siteData: ISiteContent) => {
  try {
    const response = await pageModal.create(siteData);
    return response;
  } catch (e: any) {
    console.log("error ", e);
  }
};
