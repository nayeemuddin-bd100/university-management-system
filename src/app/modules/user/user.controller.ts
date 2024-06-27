import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IAdmin } from "../admin/admin.interface";
import { IFaculty } from "../faculty/faculty.interface";
import { IStudent } from "../student/student.interface";
import { IUser } from "./user.interface";
import { usersService } from "./user.service";

const createStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { student, ...userData } = req.body;
    const result = await usersService.createStudent(
      req.file,
      student,
      userData
    );

    sendResponse<IUser | null>(res, {
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

const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { admin, ...userData } = req.body;
    const result = await usersService.createAdmin(admin, userData);

    sendResponse<IUser>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Admin created successfully!",
      data: result,
    });
  }
);

const getMe = catchAsync(async (req: Request, res: Response) => {
  const { userId, role } = req.user as { userId: string; role: string };

  const result = await usersService.getMe(userId, role);

  sendResponse<IStudent | IAdmin | IFaculty | null>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User retrieved successfully",
    data: result,
  });
});

export const userController = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
};
