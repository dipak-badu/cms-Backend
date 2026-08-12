import Router from "express";
import AuthController from "../controller/AuthController";
import checkLogin from "../middlewares/AuthMIddleware";
import bodyValidator from "../middlewares/ValidationMiddleware";
import z from "zod";
import { LogininDTO } from "../request/AuthRequest";
import uploader from "../middlewares/UploaderMiddleware";
import { RegisterDTO } from "../request/AuthRequest";

const authRouter = Router();
const authController = new AuthController();

//? how to use the multer middleware in the router
//! 1. uploader.none() - for no file upload
//! 2. uploader.single("file") - for single file upload
//! 3. uploader.array("files", maxCount) - for multiple file upload
//! 4. uploader.fields([{ name: "file1", maxCount: 1 }, { name: "file2", maxCount: 1 }]) - for multiple file upload with different field names

authRouter.post(
  "/register",
  uploader("/avatars").single("image"),
  bodyValidator(RegisterDTO),
  authController.userRegister,
);
authRouter.post("/login", bodyValidator(LogininDTO), authController.loginUser);
authRouter.post("/logout", checkLogin(), authController.logoutUser);
authRouter.post("/forgot-password", authController.forgotPassword);
authRouter.post("/reset-password", authController.resetPassword);
authRouter.post(
  "/change-password",
  checkLogin(),
  authController.changePassword,
);

authRouter.get("/me", checkLogin(), authController.getLoggedInUser);

export default authRouter;
