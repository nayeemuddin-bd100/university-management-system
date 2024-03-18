import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { paginationFields } from "../../constant/pagination";
import { studentFilterableFields } from "./student.constant";
import { IStudent } from "./student.interface";
import { studentService } from "./student.service";

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, studentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await studentService.getAllStudents(filter, paginationOptions);

  sendResponse<IStudent[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Students retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await studentService.getSingleStudent(id);

  sendResponse<IStudent>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Student retrieved successfully",
    data: result,
  });
});

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await studentService.deleteStudent(id);

  sendResponse<IStudent>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Student deleted successfully",
    data: result,
  });
});

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await studentService.updateStudent(id, updatedData);

  sendResponse<IStudent>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Student updated successfully",
    data: result,
  });
});

export const studentController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
