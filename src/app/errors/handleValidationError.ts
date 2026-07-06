import { IGenericErrorResponse } from "../interfaces";

const handleValidationError = (
  error: Error
): IGenericErrorResponse => {
  return {
    statusCode: 400,
    message: error.message,
    errorDetails: error,
  };
};

export default handleValidationError;