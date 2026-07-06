import { ErrorRequestHandler } from "express";
import { Prisma } from "@prisma/client";

import { AppError } from "../errors";
import handlePrismaError from "../errors/handlePrismaError";

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  let statusCode = 500;
  let message = "Something went wrong";
  let errorDetails: unknown = error;

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const simplifiedError = handlePrismaError(error);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorDetails = simplifiedError.errorDetails;
  } else if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
    errorDetails = null;
  } else if (error instanceof Error) {
    message = error.message;
    errorDetails = null;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorDetails,
    stack:
      process.env.NODE_ENV === "development"
        ? error.stack
        : undefined,
  });
};

export default globalErrorHandler;