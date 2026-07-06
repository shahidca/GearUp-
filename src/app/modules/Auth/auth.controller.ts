import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { catchAsync, sendResponse } from "../../utils";
import { AuthService } from "./auth.service";

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.registerUser(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "User registered successfully",
    data: result
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Login successful",
    data: result,
  });
});

export const AuthController = {
  registerUser,
  loginUser,
};