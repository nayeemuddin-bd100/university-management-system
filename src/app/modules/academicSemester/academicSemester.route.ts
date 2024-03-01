import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { academicSemesterController } from "./academicSemester.controller";
import { AcademicSemesterValidation } from "./academicSemester.validation";

const router = express.Router();

router.post(
  "/create-semester",
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  academicSemesterController.createSemester
);

export const academicSemesterRoute = router;
