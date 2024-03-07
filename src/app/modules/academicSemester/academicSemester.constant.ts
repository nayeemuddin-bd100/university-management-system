import {
  IAcademicCode,
  IAcademicSemesterMonth,
  IAcademicTitle,
} from "./academicSemester.interface";

export const academicSemesterTitle: IAcademicTitle[] = [
  "Autumn",
  "Summer",
  "Fall",
] as const;
export const academicSemesterCode: IAcademicCode[] = [
  "01",
  "02",
  "03",
] as const;
export const academicSemesterMonth: IAcademicSemesterMonth[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const academicSemesterTitleCodeMapper: { [key: string]: string } = {
  Autumn: "01",
  Summer: "02",
  Fall: "03",
};
