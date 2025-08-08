import asynchandler from "../utils/asynchandler.js";
import { ApiError } from "../utils/apierrors.js";
import { Blog } from "../models/blog.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { fileuploader } from "../utils/cloudinary.js";
import { deleteFile } from "../utils/cloudinary.js";
import blog from "../Routes/blog.routes.js";

const CreateBlog = asynchandler(async (req, res) => {
  const { title, tags, auther = "Sysvon Editorial Team", sections } = req.body;

  // Validate fields
  if (!title?.trim() || !sections || !tags) {
    throw new ApiError(400, "Title, tags, and sections are required.");
  }

  let parsedSections;
  try {
    parsedSections =
      typeof sections === "string" ? JSON.parse(sections) : sections;
  } catch {
    throw new ApiError(400, "Invalid sections format.");
  }

  const avatarlocalpath = req.files?.avatar?.[0]?.path;
  if (!avatarlocalpath) {
    throw new ApiError(400, "Avatar image is required.");
  }

  const avatar = await fileuploader(avatarlocalpath);
  if (!avatar?.url) {
    throw new ApiError(500, "Failed to upload avatar.");
  }

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  const newBlog = await Blog.create({
    slug,
    title,
    sections: parsedSections,
    tags,
    auther,
    avatar: avatar.url,
    publicid: avatar.public_id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, newBlog, "✅ Blog created successfully."));
});
const getBlogs = asynchandler(async (req, res) => {
  const allBlogs = await Blog.find();
  if (!allBlogs) {
    throw new ApiError(404, "No blogs are found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, allBlogs, "All Blogs are fetched susussfully"));
});
const deleteBlog = asynchandler(async (req, res) => {
  const { id } = req.params;
  const { publicid } = req.body;
  console.log("here is the id", publicid);
  const imgdel = await deleteFile(publicid);
  if (!imgdel) {
    throw new ApiError(404, "image deletion is faild");
  }
  const deleted = await Blog.findByIdAndDelete(id);
  if (deleted === null) {
    throw new ApiError(404, "Blog not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Blog  deleted sucessfully"));
});
const getBlogDetail = asynchandler(async (req, res) => {
  const { slug } = req.params;

  const blogDetail = await Blog.findOne({ slug });

  if (!blogDetail) {
    throw new ApiError(404, "No blog found with this slug");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { blogDetail }, "Blog fetched successfully"));
});

export { CreateBlog, getBlogs, deleteBlog, getBlogDetail };
