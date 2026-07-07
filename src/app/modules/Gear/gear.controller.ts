import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { GearService } from "./gear.service";
import pick from "../../utils/pick";
import { paginationHelper } from "../../utils/paginationHelper";
import { gearFilterableFields } from "./gear.constant";

const createGear = catchAsync(async (req, res) => {

  const result = await GearService.createGear(req.user, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Gear created successfully",
    data: result,
  });

});

const getAllGear = catchAsync(async (req, res) => {
  const filters = pick(req.query, gearFilterableFields);

  const paginationOptions = paginationHelper.calculatePagination({
    page: Number(req.query.page),
    limit: Number(req.query.limit),
    sortBy: req.query.sortBy as string,
    sortOrder: req.query.sortOrder as "asc" | "desc",
  });

  const result = await GearService.getAllGear(filters, paginationOptions);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Gear retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleGear = catchAsync(async (req, res) => {
  const result = await GearService.getSingleGear(
    req.params.id as string
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Gear retrieved successfully",
    data: result,
  });
});

const updateGear = catchAsync(async (req, res) => {
  const result = await GearService.updateGear(
    req.user,
    req.params.id as string,
    req.body
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Gear updated successfully",
    data: result,
  });
});

const deleteGear = catchAsync(async (req, res) => {
  await GearService.deleteGear(
    req.user,
    req.params.id as string
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Gear deleted successfully",
    data: null,
  });
});

export const GearController = {
  createGear,
  getAllGear,
  getSingleGear,
  updateGear,
  deleteGear,
};