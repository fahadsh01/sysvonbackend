import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allowedOrigins = process.env.CORS_ORIGIN.split(",");

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "60kb" }));
app.use(express.urlencoded({ limit: "60kb" }));
app.use(cookieParser());

// --- API routes FIRST ---
import user from "./Routes/user.routes.js";
import blog from "./Routes/blog.routes.js";
import Contact from "./Routes/contactus.routes.js";
import subscriber from "./Routes/subs.routes.js";

app.use("/api/v1/users", user);
app.use("/api/v1/blog", blog);
app.use("/api/v1/contact", Contact);
app.use("/api/v1/subscriber", subscriber);

app.get("/", (req, res) => {
  res.send("API is running");
});

// --- THEN serve frontend static files and catch-all for React router ---
app.use(express.static(path.join(__dirname, "../admin-panel/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../admin-panel/dist/index.html"));
});

export default app;
