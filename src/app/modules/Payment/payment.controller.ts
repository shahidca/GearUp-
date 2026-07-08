import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PaymentService } from "./payment.service";

const createPayment = catchAsync(async (req, res) => {
  const result = await PaymentService.createPayment(
    req.user,
    req.body.rentalOrderId
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Rental verified successfully",
    data: result,
  });
});

const confirmPayment = catchAsync(
  async (req, res) => {

    const result =
      await PaymentService.confirmPayment(
        req.body.paymentIntentId
      );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message:
        "Payment confirmed successfully",
      data: result,
    });

  }
);
const getMyPayments = catchAsync(async (req, res) => {
  const result = await PaymentService.getMyPayments(
      req.user
    );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message:
      "Payments retrieved successfully",
    data: result,
  });
});

const getPaymentById = catchAsync(
  async (req, res) => {
    const result =
      await PaymentService.getPaymentById(
        req.user,
        req.params.id as string
      );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message:
        "Payment retrieved successfully",
      data: result,
    });
  }
);

export const PaymentController = {
  createPayment,
  confirmPayment,
  getMyPayments,
  getPaymentById,
};