import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiError";
import { User } from "../user/user.model";
import { ILoginUser } from "./auth.interface";

const loginUser = async (payload: ILoginUser) => {
  const { id, password } = payload;

  // //check if user exist
  // const isUserExist = await User.findOne(
  //   { id },
  //   { id: 1, password: 1, needsPasswordChange: 1 }
  // );

  // //   check password
  // const isPasswordMatched = await bcrypt.compare(
  //   password,
  //   isUserExist?.password
  // );

  // ====> Restructure the above code into static method.

  const user = await new User();
  const isUserExist = await user.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, " User does not found");
  }

  const isPasswordMatched = await user.isPasswordMatch(
    password,
    isUserExist.password ?? ""
  );

  if (!isPasswordMatched) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Password is incorrect");
  }

  return isUserExist;
};

export const authService = {
  loginUser,
};
