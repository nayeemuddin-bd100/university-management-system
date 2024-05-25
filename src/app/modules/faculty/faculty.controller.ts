import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { paginationFields } from "../../constant/pagination";
import { facultyFilterableFields } from "./faculty.constant";
import { IFaculty } from "./faculty.interface";
import { facultyService } from "./faculty.service";

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, facultyFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await facultyService.getAllFaculties(
    filters,
    paginationOptions
  );

  sendResponse<IFaculty[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "faculties retrieved successfully !",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await facultyService.getSingleFaculty(id);

  sendResponse<IFaculty>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "faculty retrieved successfully !",
    data: result,
  });
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await facultyService.updateFaculty(id, updatedData);

  sendResponse<IFaculty>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "faculty updated successfully !",
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await facultyService.deleteFaculty(id);

  sendResponse<IFaculty>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "faculty deleted successfully !",
    data: result,
  });
});

export const facultyController = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
