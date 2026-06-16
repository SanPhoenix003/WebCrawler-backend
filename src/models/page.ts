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

export const pageModal = mongoose.model("page", page);
