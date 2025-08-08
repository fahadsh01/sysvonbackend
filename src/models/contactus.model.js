import mongoose, { Schema } from "mongoose";
const contactSchema = new Schema(
  {
    pnumber: {
      type: Number,
    },
    city: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    company: {
      type: String,
    },
    role: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);
export const Contact = mongoose.model("Contact", contactSchema);
