import { type NextFunction, type Request, type Response } from "express";
import bcrypt from "bcryptjs";
import { file } from "zod/v4/classic/external.cjs";
import { appConfig } from "../config/appConfig";
import AuthService from "../service/AuthService";
import { ImageMapper } from "../utils/helper";

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
      // by making the utils
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

  loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { username, password } = req.body;

      const user = await AuthService.getSinglerowByFilter({
        $or: [{ username: username }, { email: username }],
      });
      if (!user) {
        throw { code: 404, message: "User not found" };
      }
      // verify password
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        throw { code: 401, message: "Invalid password" };
      }
      res.json({
        data: user,
        message: "User logged in successfully",
        meta: null,
      });
    } catch (exception) {
      console.log("Controller-login:", exception);
      next(exception);
    }
  };

  logoutUser(req: Request, res: Response) {}
  forgotPassword(req: Request, res: Response) {}
  resetPassword(req: Request, res: Response) {}
  changePassword(req: Request, res: Response) {}
}

export default AuthController;
