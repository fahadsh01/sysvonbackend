import mongoose, { Schema } from "mongoose";

const sectionSchema = new Schema({
  id: { type: String, required: true },
  label: { type: String, required: true },
  content: { type: String, required: true }, // Markdown or HTML
});

const blogSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    publicid: {
      type: String,
      required: true,
    },
    sections: [sectionSchema],
    avatar: { type: String, required: true },
    auther: { type: String, default: "Sysvon Editorial Team" },
    tags: { type: String, required: true },
  },
  { timestamps: true }
);

export const Blog = mongoose.model("Blog", blogSchema);
