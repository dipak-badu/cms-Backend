import Router from "express";
import AuthController from "../controller/AuthController";
const authRouter = Router();
const authController = new AuthController();

authRouter.post("/register", authController.userRegister);
authRouter.post("/login", authController.loginUser);
authRouter.post("/logout", authController.logoutUser);
authRouter.post("/forgot-password", authController.forgotPassword);
authRouter.post("/reset-password", authController.resetPassword);
authRouter.post("/change-password", authController.changePassword);

export default authRouter;
