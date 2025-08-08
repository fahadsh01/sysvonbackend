import dbConnect from "./db/db.js";
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./env",
});

dbConnect()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`The server is running on port :${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database connection failed:", err);
  });
