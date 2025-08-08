import mongoose, { Schema } from "mongoose";
const subsSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);
export const Subs = mongoose.model("Subs", subsSchema);
