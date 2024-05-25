import { Model } from "mongoose";

export type IManageDepartment = {
  title: string;
};

export type ManageDepartmentModel = Model<
  IManageDepartment,
  Record<string, unknown>
>;

export type IManageDepartmentFilters = {
  searchTerm?: string;
};
