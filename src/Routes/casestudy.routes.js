import { Router } from "express";
import {
  createCase,
  getAllCase,
  deleteCase,
} from "../controllers/casestudy.controllers.js";
import { verifyjwt } from "../middlewares/auth.js";

const Case = new Router();
Case.route("/create-case").post(createCase);
Case.route("/get-case").get(verifyjwt, getAllCase);
Case.route("/delete-case/:id").delete(verifyjwt, deleteCase);
export default Case;
