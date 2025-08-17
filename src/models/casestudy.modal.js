import mongoose, { Schema } from "mongoose";
const caseSchema = new Schema(
  {
    jobtitle: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    firstname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    company: {
      type: String,
    },
    lastname: {
      type: String,
    },
    slug: {
      type: String,
    },
  },
  { timestamps: true }
);
export const Case = mongoose.model("Case", caseSchema);
