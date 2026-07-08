import { StatusCodes } from "http-status-codes";

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { AdminService } from "./admin.service";

const getAllUsers = catchAsync(async (_req, res) => {
  const result = await AdminService.getAllUsers();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
});

const updateUserStatus = catchAsync(async (req, res) => {
  const result = await AdminService.updateUserStatus(
    req.params.id as string,
    req.body
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User status updated successfully",
    data: result,
  });
});

const getAllGear = catchAsync(async (_req, res) => {
  const result = await AdminService.getAllGear();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Gear retrieved successfully",
    data: result,
  });
});

const getAllRentals = catchAsync(async (_req, res) => {
  const result = await AdminService.getAllRentals();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Rentals retrieved successfully",
    data: result,
  });
});

export const AdminController = {
  getAllUsers,
  updateUserStatus,
  getAllGear,
  getAllRentals,
};