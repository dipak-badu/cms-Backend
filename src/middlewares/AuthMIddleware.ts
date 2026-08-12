import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { appConfig } from "../config/appConfig";
import AuthService from "../service/AuthService";
import { IAuthRequest } from "../types/Request";
import { ImageType } from "../types/Request";
//
// const checkLogin = (req: Request, res: Response, next: NextFunction) => {
//   console.log("checkLogin middleware called");
//   next();
// };

//! middleawre using closure
// we can pass the parameters to the middleware function and return a new middleware function that has access to those parameters. This is useful when we want to create a middleware function that can be customized based on the parameters passed to it.
const checkLogin = () => {
  return async (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
      // extract the token from the request header
      let token = req.headers.authorization;
      if (!token) {
        throw { code: 401, message: "Unauthorized token" };
      } else {
        // remove the "Bearer " prefix from the token
        token = token.replace("Bearer ", "");
        // verify the token using jwt
        const decoded = jwt.verify(token, appConfig.jwtSecret as string);

        const userDetail = await AuthService.getSinglerowByFilter({
          _id: (decoded as any).sub,
        }); // here sub is user is that we have set in the payload of the token while generating it in the loginUser function of AuthController.ts file accessToken = jwt.sign
        if (!userDetail) {
          throw { code: 401, message: "Unauthorized user" };
        } else {
          req.loggedInUser = {
            _id: new String(userDetail._id),
            email: userDetail.email,
            name: userDetail.name,
            username: userDetail.username,
            image: userDetail.image as ImageType,
            role: userDetail.role,
            phone: userDetail.phone as string,
            address: userDetail.address as string,
          }; // attach the user detail to the request object for further use in the controller
        }
        next(); // call the next middleware or controller function
      }
    } catch (exception) {
      console.log("Middleware-checkLogin:", exception);
      next(exception);
    }
  };
};
export default checkLogin;

//! types of middleware in express are:
//* 1. Application-level middleware
//* 2. Router-level middleware
//* 3. Error-handling middleware
//* 4. Built-in middleware
//* 5. Third-party middleware
