import express from "express";
import cors from "cors";
import { connectDb } from "./src/config/db.js";
import router from "./src/routes/crawlerRoute.js";

const app = express();

connectDb();

app.use(cors());
app.use(express.json(), express.urlencoded({ extended: true }));

app.use("/crawler", router);


app.listen(3000, () => {
  console.log("server running at 3000");
});
