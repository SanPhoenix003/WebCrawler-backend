import mongoose from "mongoose";

const crawlerSite = new mongoose.Schema(
  {
    title: String,
    siteUrl: String,
    childUrls: [String],
    description: String,
  },
  {
    timestamps: true,
  },
);

export const crawlerSiteModal = mongoose.model("crawlerSite", crawlerSite);
