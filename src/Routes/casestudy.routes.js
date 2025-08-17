import { Router } from "express";
import {
  createCase,
  getAllCase,
  deleteCase,
} from "../controllers/casestudy.controllers.js";
import { verifyjwt } from "../middlewares/auth.js";

const Case = new Router();
Contact.route("/create-case").post(createCase);
Contact.route("/get-case").get(verifyjwt, getAllCase);
Contact.route("/delete-case/:id").delete(verifyjwt, deleteCase);
export default Case;
