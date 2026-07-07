import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { RentalService } from "./rental.service";

const createRental = catchAsync(async (req, res) => {
  const result = await RentalService.createRental(
    req.user,
    req.body
  );

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Rental created successfully",
    data: result,
  });
});

export const RentalController = {
  createRental,
};