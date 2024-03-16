import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { paginationFields } from "../../constant/pagination";
import { academicDepartmentFilterableFields } from "./academicDepartment.constant";
import { academicDepartmentService } from "./academicDepartment.service";

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...academicDepartmentData } = req.body;
  const result = await academicDepartmentService.createDepartment(
    academicDepartmentData
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Academic Department created successfully",
    data: result,
  });
});

const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicDepartmentFilterableFields);
  const paginationOption = pick(req.query, paginationFields);

  const result = await academicDepartmentService.getAllDepartments(
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

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params?.id;

  const result = await academicDepartmentService.getSingleDepartment(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Academic Department retrieved successfully",
    data: result,
  });
});

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params?.id;
  const updatedData = req.body;

  const result = await academicDepartmentService.updateDepartment(
    id,
    updatedData
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Academic Department updated successfully",
    data: result,
  });
});

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params?.id;

  const result = await academicDepartmentService.deleteDepartment(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Academic Department deleted successfully",
    data: result,
  });
});

export const academicDepartmentController = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
