import type { ErrorRequestHandler } from "express";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import AppError from "./AppError";
import { handleGenericError, handlePrismaError, handleZodError} from "./";
import { envConfig } from "../config";

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  let statusCode = 500;
  let message = "Something went wrong";
  let errorDetails: { path: string | number; message: string }[] = [];

  // Zod Error
  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorDetails = simplifiedError.errorDetails;
  }

  // Prisma Error
  else if (
    error instanceof Prisma.PrismaClientKnownRequestError
  ) {
    const simplifiedError = handlePrismaError(error);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorDetails = simplifiedError.errorDetails;
  }

  // Custom App Error
  else if (error instanceof AppError) {
    statusCode = error.statusCode;

    message = error.message;

    errorDetails = [
      {
        path: "",
        message: error.message,
      },
    ];
  }

  // Generic Error
  else if (error instanceof Error) {
    const simplifiedError = handleGenericError(error);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorDetails = simplifiedError.errorDetails;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorDetails,
    stack:
      envConfig.NODE_ENV === "development"
        ? error.stack
        : undefined,
  });
};

export default globalErrorHandler;