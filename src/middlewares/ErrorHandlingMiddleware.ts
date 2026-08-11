import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  details?: Record<string, any>;
  code?: number;
  keyPattern?: string;
}
export default function errorHnadler(
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  let detail = error.details || error.stack || null;
  let code: number = (error as any).code || 500;
  let message: string = error.message || "Internal Server Error";

  if (error.name === "MongoServerError") {
    code = 422;
    if (error.code === 11000) {
      message = "Duplicate key error";
    }
  }
  res.status(code).json({
    error: detail,
    message,
    meta: null,
  });
}
