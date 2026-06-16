import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/webcrawler");
    console.log("DB connected");
  } catch (e) {
    console.log(e);
  }
};