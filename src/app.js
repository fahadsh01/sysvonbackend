import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "60kb" }));
app.use(express.urlencoded({ limit: "60kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import user from "./Routes/user.routes.js";
import blog from "./Routes/blog.routes.js";
import Contact from "./Routes/contactus.routes.js";
import subscriber from "./Routes/subs.routes.js";
// routes declaration
app.use("/api/v1/users", user);
app.use("/api/v1/blog", blog);
app.use("/api/v1/contact", Contact);
app.use("/api/v1/subscriber", subscriber);
app.get("/", (req, res) => {
  res.send("API is running");
});

export default app;
