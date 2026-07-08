import { StatusCodes } from "http-status-codes";

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { ReviewService } from "./review.service";

const createReview = catchAsync(async (req, res) => {
  const result = await ReviewService.createReview(
    req.user,
    req.body
  );

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Review created successfully",
    data: result,
  });
});

export const ReviewController = {
  createReview,
};