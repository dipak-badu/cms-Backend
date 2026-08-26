import { Router } from "express";
import checkLogin from "../middlewares/AuthMIddleware";
import MessageController from "../controller/MessageController";

const msgCntrl = new MessageController();

const messageRouter = Router();

messageRouter.get("/:senderId", checkLogin(), msg);
export default messageRouter;
