import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

import type { TGenericErrorResponse } from "./error.interface";

const handleZodError = (
  error: ZodError
): TGenericErrorResponse => {
  const errorDetails = error.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));

  return {
    statusCode: StatusCodes.BAD_REQUEST,
    message: "Validation Error",
    errorDetails,
  };
};

export default handleZodError;