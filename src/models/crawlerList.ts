import mongoose from "mongoose";

const crawlerListSchema = new mongoose.Schema(
  {
    url: String,
  },
  {
    timestamps: true,
  },
);

export const crawlerListModel = mongoose.model(
  "crawlerList",
  crawlerListSchema,
);
