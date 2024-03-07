import express from "express";
import { academicSemesterRoute } from "../modules/academicSemester/academicSemester.route";
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
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

// router.use("/users/", userRoute);
// router.use("/academic-semester/", academicSemesterRoute);

export default router;
