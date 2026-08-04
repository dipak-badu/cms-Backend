import type { Request, Response, NextFunction } from "express";

//
// const checkLogin = (req: Request, res: Response, next: NextFunction) => {
//   console.log("checkLogin middleware called");
//   next();
// };

//! middleawre using closure
// we can pass the parameters to the middleware function and return a new middleware function that has access to those parameters. This is useful when we want to create a middleware function that can be customized based on the parameters passed to it.
const checkLogin = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log("checkLogin middleware called");
    next();
  };
};
export default checkLogin;

//! types of middleware in express are:
//* 1. Application-level middleware
//* 2. Router-level middleware
//* 3. Error-handling middleware
//* 4. Built-in middleware
//* 5. Third-party middleware
