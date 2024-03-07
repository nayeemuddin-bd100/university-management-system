import { StatusCodes } from "http-status-codes";
import { Schema, model } from "mongoose";
import ApiError from "../../../errors/ApiError";
import {
  academicSemesterCode,
  academicSemesterMonth,
  academicSemesterTitle,
} from "./academicSemester.constant";
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from "./academicSemester.interface";

const AcademicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemesterTitle,
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemesterCode,
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonth,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonth,
    },
  },
  { timestamps: true }
);

AcademicSemesterSchema.pre("save", async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });

  if (isExist) {
    throw new ApiError(StatusCodes.CONFLICT, "Academic semester already exist");
  }
  next();
});

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  "AcademicSemester",
  AcademicSemesterSchema
);
