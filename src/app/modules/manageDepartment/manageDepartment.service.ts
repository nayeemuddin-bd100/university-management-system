import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../interfaces/common";
import { IPaginationOptions } from "../../interfaces/pagination";
import { manageDepartmentSearchableFields } from "./manageDepartment.constant";
import {
  IManageDepartment,
  IManageDepartmentFilters,
} from "./manageDepartment.interface";
import { ManageDepartment } from "./manageDepartment.model";

const createDepartment = async (
  payload: IManageDepartment
): Promise<IManageDepartment | null> => {
  const result = await ManageDepartment.create(payload);
  return result;
};

const getAllDepartments = async (
  filters: IManageDepartmentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IManageDepartment[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: manageDepartmentSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await ManageDepartment.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await ManageDepartment.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleDepartment = async (
  id: string
): Promise<IManageDepartment | null> => {
  const result = await ManageDepartment.findById(id);
  return result;
};

const updateDepartment = async (
  id: string,
  payload: Partial<IManageDepartment>
): Promise<IManageDepartment | null> => {
  const result = await ManageDepartment.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteDepartment = async (
  id: string
): Promise<IManageDepartment | null> => {
  const result = await ManageDepartment.findByIdAndDelete(id);
  return result;
};

export const manageDepartmentService = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
