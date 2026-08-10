import { type Request, type Response } from "express";
import bcrypt from "bcryptjs";
import { file } from "zod/v4/classic/external.cjs";
import { appConfig } from "../config/appConfig";
import AuthService from "../service/AuthService";

class AuthController {
  async userRegister(req: Request, res: Response) {
    try {
      const data = req.body;
      data.password = bcrypt.hashSync(data.password, 12);
      if (req.file) {
        data.image = {
          filename: req.file.filename,
          path: req.file.path,
          type: req.file.mimetype,
          size: req.file.size,
          url: `${appConfig.assetUrl}/${req.file.filename}`,
        };
      }
      console.log("Received registration data:", data);
      // db service call to save user data in database
      const user = await AuthService.registerUser(data);
      res.json({
        data: user,
        message: "user registered successfully",
        meta: null,
      });
      console.log("User registered successfully:", user);
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while registering the user",
      });
    }
  }
  loginUser(req: Request, res: Response) {}
  logoutUser(req: Request, res: Response) {}
  forgotPassword(req: Request, res: Response) {}
  resetPassword(req: Request, res: Response) {}
  changePassword(req: Request, res: Response) {}
}

export default AuthController;
