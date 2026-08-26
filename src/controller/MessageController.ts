import { NextFunction, Request, Response } from "express";
import { IAuthRequest } from "../types/Request";
import MessageService from "../service/MessageService";
import { Op } from "sequelize";
const msgService = new MessageService();

class MessageController {
  async storeMessage(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async getChatListWithUser(
    req: IAuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    const loggedInUser = req.loggedInUser;
    try {
      const { rows, pagination } = await msgService.getAllMessagesByFilter(
        {
          [Op.or]: [
            {
              sender: loggedInUser?._id,
              receiver: req.params.senderId as string,
            },
            {
              receiver: loggedInUser?._id,
              sender: req.params.senderId as string,
            },
          ],
        },
        {
          limit: (req.query.limit || 10) as number,
          page: (req.query.page || 1) as number,
        },
      );

      res.json({
        data: rows,
        message: "chat list fetched successfully",
        meta: pagination,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default MessageController;
