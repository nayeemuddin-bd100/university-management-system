import express from "express";
import { academicDepartmentRoute } from "../modules/academicDepartment/academicDepartment.route";
import { academicFacultyRoute } from "../modules/academicFaculty/academicFaculty.route";
import { academicSemesterRoute } from "../modules/academicSemester/academicSemester.route";
import { adminRoute } from "../modules/admin/admin.route";
import { facultyRoute } from "../modules/faculty/faculty.route";
import { managementDepartmentRoute } from "../modules/manageDepartment/manageDepartment.route";
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
  {
    path: "/admin",
    route: adminRoute,
  },
  {
    path: "/manage-department",
    route: managementDepartmentRoute,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

// router.use("/users/", userRoute);
// router.use("/academic-semester/", academicSemesterRoute);

export default router;
