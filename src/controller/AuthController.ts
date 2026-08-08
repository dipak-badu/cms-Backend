import { type Request, type Response } from "express";
import bcrypt from "bcryptjs";
import { file } from "zod/v4/classic/external.cjs";
import { appConfig } from "../config/appConfig";

class AuthController {
  async userRegister(req: Request, res: Response) {
    const data = req.body;
    data.password = bcrypt.hashSync(data.password, 12);
    if (req.file) {
      data.avatar = {
        filename: req.file.filename,
        path: req.file.path,
        type: req.file.mimetype,
        size: req.file.size,
        url: `${appConfig.assetUrl}/${req.file.filename}`,
      };
    }
    res.json({
      data: data,
      message: "user registered successfully",
      meta: null,
    });
  }
  loginUser(req: Request, res: Response) {}
  logoutUser(req: Request, res: Response) {}
  forgotPassword(req: Request, res: Response) {}
  resetPassword(req: Request, res: Response) {}
  changePassword(req: Request, res: Response) {}
}

export default AuthController;
