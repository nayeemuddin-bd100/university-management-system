import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IAcademicSemester } from "./academicSemester.interface";
import { academicSemesterService } from "./academicSemester.service";

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } =
      req.body as unknown as IAcademicSemester;
    const result =
      await academicSemesterService.createSemester(academicSemesterData);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Academic Semester created successfully",
      data: result,
    });

    next();
  }
);

export const academicSemesterController = {
  createSemester,
};
