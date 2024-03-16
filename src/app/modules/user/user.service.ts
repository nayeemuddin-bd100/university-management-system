import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { IAcademicSemester } from "../academicSemester/academicSemester.interface";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from "./user.utils";

const createUser = async (user: IUser): Promise<IUser | null> => {
  //set user id
  let id;
  const academicSemester = {
    title: "Autumn",
    year: "2032",
    code: "01",
    startMonth: "January",
    endMonth: "May",
  };
  if (user.role === "admin") {
    id = await generateAdminId();
    user.id = id;
  } else if (user.role === "student") {
    id = await generateStudentId(academicSemester as IAcademicSemester);
    user.id = id;
  } else if (user.role === "faculty") {
    id = await generateFacultyId();
    user.id = id;
  }

  // set default password
  if (!user.password) {
    user.password = config.default_user_password as string;
  }
  const createUser = await User.create(user);
  if (!createUser) {
    throw new ApiError(400, "Failed to create user");
  }

  return createUser;
};

export const usersService = {
  createUser,
};
