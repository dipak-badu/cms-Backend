import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  details?: Record<string, any>;
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

  res.status(code).json({
    error: null,
    message,
    meta: null,
  });
}
