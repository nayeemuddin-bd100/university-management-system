import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { usersService } from "./user.service";

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { student, ...userData } = req.body;
  const result = await usersService.createStudent(student, userData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Student created successfully",
    data: result,
  });
});

export const userController = { createStudent };
