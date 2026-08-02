import { type Request, type Response } from "express";

class AuthController {
  userRegister(req: Request, res: Response) {
    res.json({
      data: {
        accessToken: "",
        refreshToken: "",
      },
      message: "success",
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
