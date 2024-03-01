import { Model } from "mongoose";

export type IAcademicSemesterMonth =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export type IAcademicTitle = "Autumn" | "Summer" | "Fall";
export type IAcademicCode = "01" | "02" | "03";
export type IAcademicSemester = {
  title: IAcademicTitle;
  year: number;
  code: IAcademicCode;
  startMonth: IAcademicSemesterMonth;
  endMonth: IAcademicSemesterMonth;
};

export type AcademicSemesterModel = Model<
  IAcademicSemester,
  Record<string, unknown>
>;
