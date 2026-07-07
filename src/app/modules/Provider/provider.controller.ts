import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProviderService } from "./provider.service";

const getProviderOrders = catchAsync(async (req, res) => {
  const result = await ProviderService.getProviderOrders(req.user);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Provider orders retrieved successfully",
    data: result,
  });
});

const updateOrderStatus = catchAsync(async (req, res) => {
  const result = await ProviderService.updateOrderStatus(
    req.user,
    req.params.id as string,
    req.body
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Rental order status updated successfully",
    data: result,
  });
});

export const ProviderController = {
  getProviderOrders,
  updateOrderStatus,
};