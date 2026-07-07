import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { GearService } from "./gear.service";

const createGear = catchAsync(async (req, res) => {

  const result = await GearService.createGear(req.user, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Gear created successfully",
    data: result,
  });

});

export const GearController = {
  createGear,
};