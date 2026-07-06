import { Prisma } from "@prisma/client";
import { IGenericErrorResponse } from "../interfaces";

const handlePrismaError = (
  error: Prisma.PrismaClientKnownRequestError
): IGenericErrorResponse => {
  return {
    statusCode: 400,
    message: error.message,
    errorDetails: error.meta,
  };
};

export default handlePrismaError;