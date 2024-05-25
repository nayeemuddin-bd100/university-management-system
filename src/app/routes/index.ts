import express from "express";
import { academicDepartmentRoute } from "../modules/academicDepartment/academicDepartment.route";
import { academicFacultyRoute } from "../modules/academicFaculty/academicFaculty.route";
import { academicSemesterRoute } from "../modules/academicSemester/academicSemester.route";
import { facultyRoute } from "../modules/faculty/faculty.route";
import { studentRoute } from "../modules/student/student.route";
import { userRoute } from "../modules/user/user.route";

const router = express.Router();

const moduleRoute = [
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/academic-semester",
    route: academicSemesterRoute,
  },
  {
    path: "/academic-faculty",
    route: academicFacultyRoute,
  },
  {
    path: "/academic-department",
    route: academicDepartmentRoute,
  },
  {
    path: "/students",
    route: studentRoute,
  },
  {
    path: "/faculty",
    route: facultyRoute,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

// router.use("/users/", userRoute);
// router.use("/academic-semester/", academicSemesterRoute);

export default router;
