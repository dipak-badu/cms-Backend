import { Router } from "express";
import UserController from "../controller/UserController";
import checkLogin from "../middlewares/AuthMIddleware";
const userRouter = Router();
const userCntrl = new UserController();

userRouter.get("/", checkLogin(), userCntrl.ListAllUsers);

export default userRouter;
