import { Schema, model } from "mongoose";
import {
  IManageDepartment,
  ManageDepartmentModel,
} from "./manageDepartment.interface";

const ManageDepartmentSchema = new Schema<
  IManageDepartment,
  ManageDepartmentModel
>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const ManageDepartment = model<IManageDepartment, ManageDepartmentModel>(
  "ManageDepartment",
  ManageDepartmentSchema
);
