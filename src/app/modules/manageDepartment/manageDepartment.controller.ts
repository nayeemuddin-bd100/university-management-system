import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { paginationFields } from "../../constant/pagination";
import { manageDepartmentFilterableFields } from "./manageDepartment.constant";
import { IManageDepartment } from "./manageDepartment.interface";
import { manageDepartmentService } from "./manageDepartment.service";

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...departmentData } = req.body;
  const result = await manageDepartmentService.createDepartment(departmentData);

  sendResponse<IManageDepartment>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Manage department created successfully",
    data: result,
  });
});

const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, manageDepartmentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await manageDepartmentService.getAllDepartments(
    filters,
    paginationOptions
  );

  sendResponse<IManageDepartment[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Manage departments retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await manageDepartmentService.getSingleDepartment(id);

  sendResponse<IManageDepartment>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Management department retrieved successfully",
    data: result,
  });
});

const updateDepartment = catchAsync(
  catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await manageDepartmentService.updateDepartment(
      id,
      updatedData
    );

    sendResponse<IManageDepartment>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Management department updated successfully",
      data: result,
    });
  })
);

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await manageDepartmentService.deleteDepartment(id);

  sendResponse<IManageDepartment>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Management department deleted successfully",
    data: result,
  });
});

export const manageDepartmentController = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
