import { createPage } from "../repositories/page.repository.js";
import type { ISiteContent } from "../types/site-content.type.js";

export const generatePage = async (siteData: ISiteContent) => {
  try {
    if (siteData && siteData.title && siteData.url) {
      await createPage(siteData);
    }
  } catch (e: any) {
    console.log("error ", e);
  }
};
