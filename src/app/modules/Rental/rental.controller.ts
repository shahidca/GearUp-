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

const getMyRentals = catchAsync(async (req, res) => {
  const result = await RentalService.getMyRentals(req.user);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Rentals retrieved successfully",
    data: result,
  });
});

const getRentalById = catchAsync(async (req, res) => {
  const result = await RentalService.getRentalById(
    req.user,
    req.params.rentalId as string
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Rental retrieved successfully",
    data: result,
  });
});

const cancelRental = catchAsync(async (req, res) => {
  const result = await RentalService.cancelRental(
    req.user,
    req.params.rentalId as string
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Rental cancelled successfully",
    data: result,
  });
});

const confirmRental = catchAsync(async (req, res) => {
  const result = await RentalService.confirmRental(
    req.user,
    req.params.rentalId as string
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Rental confirmed successfully",
    data: result,
  });
});

const pickupRental = catchAsync(async (req, res) => {
  const result = await RentalService.pickupRental(
    req.user,
    req.params.rentalId as string
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Rental picked up successfully",
    data: result,
  });
});

const returnRental = catchAsync(async (req, res) => {
  const result = await RentalService.returnRental(
    req.user,
    req.params.rentalId as string
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Rental returned successfully",
    data: result,
  });
});

export const RentalController = {
  createRental,
  getMyRentals,
  getRentalById,
  cancelRental,
  confirmRental,
  pickupRental,
  returnRental,
};