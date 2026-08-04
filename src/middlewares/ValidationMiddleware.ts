import type { Request, Response, NextFunction } from "express";
import z, { ZodError } from "zod";

const bodyValidator = (schema: z.ZodType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      if (!data) {
        next({ code: 400, message: "body is not set" });
      }
      const parsedData = await schema.parseAsync(data);
      next();
    } catch (exception) {
      let details: Record<string, string> = {};
      if (exception instanceof ZodError) {
        exception.issues.map((errObj: any) => {
          details[errObj.path] = errObj.message;
        });
      }
      next({ code: 400, message: "validation failed", detail: details });
    }
  };
};

export default bodyValidator;
