import { Router } from "express";
import {
  createContact,
  getAllContact,
  deleteContact,
} from "../controllers/contactus.controllers.js";
import { verifyjwt } from "../middlewares/auth.js";

const Contact = new Router();
Contact.route("/create-contact").post(createContact);
Contact.route("/get-contact").get(verifyjwt, getAllContact);
Contact.route("/delete-contact/:id").delete(verifyjwt, deleteContact);
export default Contact;
