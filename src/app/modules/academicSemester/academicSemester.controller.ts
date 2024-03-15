import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { paginationFields } from "../../constant/pagination";
import { academicSemesterFilterableFields } from "./academicSemester.constant";
import { IAcademicSemester } from "./academicSemester.interface";
import { academicSemesterService } from "./academicSemester.service";

const createSemester = catchAsync(async (req: Request, res: Response) => {
  const { ...academicSemesterData } = req.body as unknown as IAcademicSemester;
  const result =
    await academicSemesterService.createSemester(academicSemesterData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Academic Semester created successfully",
    data: result,
  });
});

const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicSemesterFilterableFields);
  const paginationOption = pick(req.query, paginationFields);

  const result = await academicSemesterService.getAllSemesters(
    filters,
    paginationOption
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Academic Semesters retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params?.id;

    const result = await academicSemesterService.getSingleSemester(id);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Academic Semester retrieved successfully",
      data: result,
    });

    next();
  }
);

const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params?.id;
  const updatedData = req.body;

  const result = await academicSemesterService.updateSemester(id, updatedData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Academic Semester updated successfully",
    data: result,
  });
});

const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params?.id;

  const result = await academicSemesterService.deleteSemester(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Academic Semester deleted successfully",
    data: result,
  });
});

export const academicSemesterController = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
