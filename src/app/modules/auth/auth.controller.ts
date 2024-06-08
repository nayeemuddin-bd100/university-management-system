import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import config from "../../../config";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ILoginResponse } from "./auth.interface";
import { authService } from "./auth.service";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;

  const result = await authService.loginUser(loginData);

  const { refreshToken, ...rest } = result;

  const cookiesOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookiesOptions);

  sendResponse<ILoginResponse>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User Login Successfully",
    data: rest,
  });
});

export const authController = {
  loginUser,
};
