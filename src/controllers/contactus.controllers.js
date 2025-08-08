import asynchandler from "../utils/asynchandler.js";
import { ApiError } from "../utils/apierrors.js";
import { Contact } from "../models/contactus.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import nodemailer from "nodemailer";
const createContact = asynchandler(async (req, res) => {
  const { fullname, role, message, city, pnumber, company, email } = req.body;
  if (
    [fullname, role, email, message, city, pnumber, company].some(
      (fields) => fields?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All the fields are required ");
  }
  const newContact = await Contact.create({
    fullname,
    role,
    email,
    message,
    city,
    pnumber,
    company,
  });
  if (!newContact) {
    throw new ApiError(401, "something went wrong while Creating contact");
  }
  const transpoter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transpoter.sendMail({
    to: email,
    subject: "From Sysvon",
    text: "we will contact you soon ",
  });
  return res
    .status(200)
    .json(
      new ApiResponse(200, { newContact }, "contact is created sucussfully")
    );
});
const deleteContact = asynchandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await Contact.findByIdAndDelete(id);
  if (!deleted) {
    throw new ApiError(401, "the requested contant does not exist");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "contact deleted sucussfully"));
});
const getAllContact = asynchandler(async (req, res) => {
  const allContact = await Contact.find();
  if (!allContact) {
    throw new ApiError(401, "something went wrong while fetching the contacts");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, allContact, "all contact fetched sucussfully"));
});

export { createContact, getAllContact, deleteContact };
