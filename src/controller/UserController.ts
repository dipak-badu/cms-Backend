import type { Request, Response, NextFunction } from "express";
import UserService from "../service/UserService";
class UserController {
  async ListAllUsers(req: Request, res: Response, next: NextFunction) {
    // serch , filter, pagination, sort
    try {
      let filter = {};
      // serach filter
      if (req.query.q) {
        filter = {
          ...filter,
          $or: [
            { name: RegExp(req.query.q as string, "i") },
            { email: RegExp(req.query.q as string, "i") },
          ],
        };
      }

      if (req.query.role) {
        filter = {
          ...filter,
          role: req.query.role,
        };
      }

      const paginationConfig = {
        limit: req.query.limit ? parseInt(req.query.limit as string) : 20,
        page: req.query.page ? parseInt(req.query.page as string) : 1,
        skip:
          (req.query.page ? parseInt(req.query.page as string) : 1) *
          (req.query.limit ? parseInt(req.query.limit as string) : 20),
      };

      const { users, pagination } = await UserService.getAllUsers(
        filter,
        paginationConfig,
      );

      res.json({
        data: users,
        message: "success",
        meta: {
          pagination: {
            total: pagination.total,
            page: paginationConfig.page,
            limit: paginationConfig.limit,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
