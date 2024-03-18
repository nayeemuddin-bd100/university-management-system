import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { IStudent } from "../student/student.interface";
import { IUser } from "./user.interface";
import { User } from "./user.model";

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

  const createUser = await User.create(user);
  if (!createUser) {
    throw new ApiError(400, "Failed to create user");
  }

  return createUser;
};

export const usersService = {
  createStudent,
};
