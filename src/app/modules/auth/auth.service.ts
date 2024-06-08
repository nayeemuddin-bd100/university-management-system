import { StatusCodes } from "http-status-codes";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { User } from "../user/user.model";
import { ILoginResponse, ILoginUser } from "./auth.interface";

const loginUser = async (payload: ILoginUser): Promise<ILoginResponse> => {
  const { id, password } = payload;

  // Check user is exist
  const isUserExist = await User.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, " User does not found");
  }

  // Check Password
  const isPasswordMatched = await User.isPasswordMatch(
    password,
    isUserExist.password ?? ""
  );

  if (!isPasswordMatched) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Password is incorrect");
  }

  const { id: userId, role, needsPasswordChange } = isUserExist;
  // Create access token and refresh toke

  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

export const authService = {
  loginUser,
};
