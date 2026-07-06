import { Prisma } from "@prisma/client";
import { StatusCodes } from "http-status-codes";

import type { TGenericErrorResponse } from "./error.interface";

const handlePrismaError = (
  error: Prisma.PrismaClientKnownRequestError
): TGenericErrorResponse => {
  let message = "Database Error";
  let path = "";

  if (error.code === "P2002") {
    message = "Duplicate value found";

    path =
      (error.meta?.target as string[])?.join(", ") ?? "";
  }

  return {
    statusCode: StatusCodes.BAD_REQUEST,
    message,
    errorDetails: [
      {
        path,
        message,
      },
    ],
  };
};

export default handlePrismaError;