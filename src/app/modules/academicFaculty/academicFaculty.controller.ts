import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { paginationFields } from "../../constant/pagination";
import { academicFacultyFilterableFields } from "./academicFaculty.constant";
import { academicFacultyService } from "./academicFaculty.service";

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...academicFacultyData } = req.body;
  const result =
    await academicFacultyService.createFaculty(academicFacultyData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Academic Faculty created successfully",
    data: result,
  });
});

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicFacultyFilterableFields);
  const paginationOption = pick(req.query, paginationFields);

  const result = await academicFacultyService.getAllFaculties(
    filters,
    paginationOption
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Academic Faculties retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params?.id;

    const result = await academicFacultyService.getSingleFaculty(id);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Academic Faculty retrieved successfully",
      data: result,
    });

    next();
  }
);

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params?.id;
  const updatedData = req.body;

  const result = await academicFacultyService.updateFaculty(id, updatedData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Academic Faculty updated successfully",
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params?.id;

  const result = await academicFacultyService.deleteFaculty(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Academic Faculty deleted successfully",
    data: result,
  });
});

export const academicFacultyController = {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
