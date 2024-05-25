import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "./user.interface";
import { usersService } from "./user.service";

const createStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { student, ...userData } = req.body;
    const result = await usersService.createStudent(student, userData);

    sendResponse<IUser>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Student created successfully",
      data: result,
    });
  }
);

const createFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { faculty, ...userData } = req.body;
    const result = await usersService.createFaculty(faculty, userData);

    sendResponse<IUser>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Faculty created successfully!",
      data: result,
    });
  }
);

export const userController = { createStudent, createFaculty };
