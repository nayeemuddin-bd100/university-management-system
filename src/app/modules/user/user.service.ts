import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { IAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { IStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // set default password
  if (!user.password) {
    user.password = config.default_student_password as string;
  }

  //set role
  user.role = "student";

  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  ).lean();

  //generate student id
  let newUserAllData = null;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const id = await generateStudentId(academicSemester as IAcademicSemester);

    user.id = id;
    student.id = id;

    // array
    const newStudent = await Student.create([student], { session });

    if (!newStudent.length) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to create student");
    }

    //set student -->  _id into user.student
    user.student = newStudent[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to create user");
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: "student",
      populate: [
        {
          path: "academicSemester",
        },
        {
          path: "academicDepartment",
        },
        {
          path: "academicFaculty",
        },
      ],
    });
  }
  return newUserAllData;
};

export const usersService = {
  createStudent,
};
