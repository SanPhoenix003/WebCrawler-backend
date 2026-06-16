import mongoose from "mongoose";

const page = new mongoose.Schema(
  {
    title: String,
    siteUrl: String,
    description: String,
  },
  {
    timestamps: true,
  },
);

export const pageModel = mongoose.model("page", page);
