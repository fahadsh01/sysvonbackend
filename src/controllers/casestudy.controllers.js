import asynchandler from "../utils/asynchandler.js";
import { ApiError } from "../utils/apierrors.js";
import { Case } from "../models/casestudy.modal.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const createCase = asynchandler(async (req, res) => {
  const { firstname, jobtitle, lastname, email, company } = req.body;
  if (
    [firstname, jobtitle, email, lastname, company].some(
      (fields) => fields?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All the fields are required ");
  }
  const newCase = await Case.create({
    firstname,
    jobtitle,
    email,
    lastname,
    company,
  });
  if (!newCase) {
    throw new ApiError(401, "something went wrong while  contacting");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, { newCase }, "contact is created sucussfully"));
});
const deleteCase = asynchandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await Case.findByIdAndDelete(id);
  if (!deleted) {
    throw new ApiError(401, "the requested contant does not exist");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "contact deleted sucussfully"));
});
const getAllCase = asynchandler(async (req, res) => {
  const allContact = await Case.find();
  if (!allContact) {
    throw new ApiError(401, "something went wrong while fetching the contacts");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, getAllCase, "all contact fetched sucussfully"));
});

export { createCase, getAllCase, deleteCase };
