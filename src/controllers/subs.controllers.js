import asynchandler from "../utils/asynchandler.js";
import { ApiError } from "../utils/apierrors.js";
import { Subs } from "../models/subs.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { json } from "express";

const createSubs = asynchandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(401, "Email is required");
  }

  const newSub = await Subs.create({ email });

  if (!newSub) {
    throw new ApiError(402, "Something went wrong while creating subscriber");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, {}, "Subscriber created successfully"));
});

const getAllSubs = asynchandler(async (req, res) => {
  const allSubs = await Subs.find();
  if (!allSubs.length === 0) {
    throw new ApiError(400, "there is no subscribers");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, allSubs, "Subscriber are Featched sucessfully"));
});
const deleteSubscriber = asynchandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await Subs.findByIdAndDelete(id);
  if (!deleted) {
    throw new ApiError(401, "the requested subscriber does not exist");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "subscriber deleted sucussfully"));
});
export { createSubs, getAllSubs, deleteSubscriber };
