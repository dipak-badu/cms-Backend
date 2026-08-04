import Router from "express";
import AuthController from "../controller/AuthController";
import checkLogin from "../middlewares/AuthMIddleware";
import bodyValidator from "../middlewares/ValidationMiddleware";
import z from "zod";
import { LogininDTO } from "../request/AuthRequest";

const authRouter = Router();
const authController = new AuthController();

authRouter.post("/register", authController.userRegister);
authRouter.post("/login", bodyValidator(LogininDTO), authController.loginUser);
authRouter.post("/logout", checkLogin, authController.logoutUser);
authRouter.post("/forgot-password", authController.forgotPassword);
authRouter.post("/reset-password", authController.resetPassword);
authRouter.post(
  "/change-password",
  checkLogin(),
  authController.changePassword,
);

export default authRouter;
