import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

const allowedOrigins = process.env.CORS_ORIGIN.split(",").map((o) => o.trim());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow tools like Postman
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

// Import your routers
import user from "./Routes/user.routes.js";
import blog from "./Routes/blog.routes.js";
import Contact from "./Routes/contactus.routes.js";
import subscriber from "./Routes/subs.routes.js";

// API routes
app.use("/api/v1/users", user);
app.use("/api/v1/blog", blog);
app.use("/api/v1/contact", Contact);
app.use("/api/v1/subscriber", subscriber);

app.get("/", (req, res) => {
  res.send("API is running");
});

export default app;
