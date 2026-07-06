import { StatusCodes } from "http-status-codes";

import type { TGenericErrorResponse } from "./error.interface";

const handleGenericError = (
  error: Error
): TGenericErrorResponse => {
  return {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message: error.message || "Something went wrong",
    errorDetails: [
      {
        path: "",
        message: error.message,
      },
    ],
  };
};

export default handleGenericError;