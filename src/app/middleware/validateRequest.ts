import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";

const validateRequest =
  (schema: ZodSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("Request Body:", req.body);

      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      console.log("Validation Passed");

      next();
    } catch (error) {
      next(error);
    }
  };

export default validateRequest;