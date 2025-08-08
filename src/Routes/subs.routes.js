import { Router } from "express";
import {
  createSubs,
  getAllSubs,
  deleteSubscriber,
} from "../controllers/subs.controllers.js";
import { verifyjwt } from "../middlewares/auth.js";

const subscriber = Router();
subscriber.route("/create-subs").post(createSubs);
subscriber.route("/get-subs").get(verifyjwt, getAllSubs);
subscriber.route("/delete-sub/:id").delete(verifyjwt, deleteSubscriber);
export default subscriber;
