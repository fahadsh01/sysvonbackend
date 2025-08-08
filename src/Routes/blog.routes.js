import { Router } from "express";
import {
  CreateBlog,
  getBlogs,
  deleteBlog,
  getBlogDetail,
} from "../controllers/createblog.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyjwt } from "../middlewares/auth.js";

const blog = Router();

blog
  .route("/create-blog")
  .post(upload.fields([{ name: "avatar", maxCount: 1 }]), CreateBlog);
blog.route("/get-blogs").get(verifyjwt, getBlogs);
blog.route("/delete-blog/:id").delete(verifyjwt, deleteBlog);
blog.route("/detailed/:slug").get(getBlogDetail);
export default blog;
