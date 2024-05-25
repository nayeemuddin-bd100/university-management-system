import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { paginationFields } from "../../constant/pagination";
import { adminFilterableFields } from "./admin.constant";
import { IAdmin } from "./admin.interface";
import { adminService } from "./admin.service";

const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, adminFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await adminService.getAllAdmins(filters, paginationOptions);

  sendResponse<IAdmin[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Admins retrieved successfully !",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await adminService.getSingleAdmin(id);

  sendResponse<IAdmin>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Admin retrieved successfully !",
    data: result,
  });
});

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await adminService.updateAdmin(id, updatedData);

  sendResponse<IAdmin>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Admin updated successfully !",
    data: result,
  });
});
const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await adminService.deleteAdmin(id);

  sendResponse<IAdmin>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Admin deleted successfully !",
    data: result,
  });
});

export const adminController = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
