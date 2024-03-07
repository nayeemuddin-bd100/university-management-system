import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { usersService } from "./user.service";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    const result = await usersService.createUser(user);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "User created successfully",
      data: result,
    });

    next();
  }
);

export const userController = { createUser };
