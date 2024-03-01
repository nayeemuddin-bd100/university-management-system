import { Schema, model } from "mongoose";
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

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  "AcademicSemester",
  AcademicSemesterSchema
);
