import { Router } from "express";
import {
  loginUser,
  logoutUser,
  register,
  refreshAccessToken,
  changeOldPassword,
} from "../controllers/register.controllers.js";
import { verifyjwt } from "../middlewares/auth.js";
const user = Router();
user.route("/register").post(register);
user.route("/login").post(loginUser);
user.route("/logout").post(verifyjwt, logoutUser);
user.route("/refreshAccessToken").post(refreshAccessToken);
user.route("/change-password").post(verifyjwt, changeOldPassword);

export default user;
