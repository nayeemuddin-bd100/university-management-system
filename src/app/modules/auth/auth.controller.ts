import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "../user/user.interface";
import { ILoginResponse, IRefreshTokenResponse } from "./auth.interface";
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

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await authService.refreshToken(refreshToken);

  const cookiesOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookiesOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User Login Successfully",
    data: result,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { ...passwordData } = req.body;

  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return null;
  const decodedRefreshToken = jwtHelpers.verifyToken(
    refreshToken,
    config.jwt.refresh_secret as Secret
  );

  if (!decodedRefreshToken) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid refresh token");
  }
  await authService.changePassword(user, passwordData, decodedRefreshToken);

  sendResponse<IUser>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Change Password Successfully",
    data: null,
  });
});

const forgetPassword = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.body?.id;

  const result = await authService.forgetPassword(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Reset link is generated successfully",
    data: result,
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const token = req?.headers?.authorization || "";

  const result = await authService.resetPassword(req.body, token);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Reset link is generated successfully",
    data: result,
  });
});

export const authController = {
  loginUser,
  refreshToken,
  changePassword,
  forgetPassword,
  resetPassword,
};
