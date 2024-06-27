import { StatusCodes } from "http-status-codes";
import { JwtPayload, Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { User } from "../user/user.model";
import {
  IChangePassword,
  ILoginResponse,
  ILoginUser,
  IRefreshTokenResponse,
} from "./auth.interface";

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

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  // Verify token
  let verifiedToken = null;

  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(StatusCodes.FORBIDDEN, "Invalid refresh token");
  }

  // Check user is exist
  const { userId, role } = verifiedToken;
  const isUserExist = await User.isUserExist(userId);
  if (!isUserExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }

  // create new access token
  const newAccessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (
  user: JwtPayload | null,
  passwordData: IChangePassword,
  decodedRefreshToken: JwtPayload
): Promise<void> => {
  const { oldPassword, newPassword } = passwordData;

  // Check user is exist
  // const isUserExist = await User.isUserExist(user?.userId);

  const isUserExist = await User.findOne({ id: user?.userId }).select(
    "+password"
  );

  if (!isUserExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }

  const isLoggedInUser = user?.userId === decodedRefreshToken?.userId;

  // Check logged in user
  if (!isLoggedInUser) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized access");
  }

  // Check old password
  const isPasswordMatched = await User.isPasswordMatch(
    oldPassword,
    isUserExist.password ?? ""
  );

  if (!isPasswordMatched) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Old password is incorrect");
  }

  // Update password
  isUserExist.needsPasswordChange = false;
  isUserExist.password = newPassword;
  await isUserExist.save();

  //hash new password
  // const hashedPassword = await bcrypt.hash(
  //   newPassword,
  //   Number(config.bcrypt_salt_round)
  // );

  // Update password
  // const updatePassword = await User.findOneAndUpdate(
  //   { id: user?.userId },
  //   {
  //     password: hashedPassword,
  //     needsPasswordChange: false,
  //     passwordUpdatedAt: Date.now(),
  //   }
  // );

  // if (!updatePassword) {
  //   throw new ApiError(StatusCodes.BAD_REQUEST, "Password update failed");
  // }
};

const forgetPassword = async (id: string) => {
  // Check user is exist
  const isUserExist = await User.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, " User does not found");
  }

  const { id: userId, role } = isUserExist;

  const resetToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    "10m"
  );

  const resetUILink = `${config.reset_ui_base_url}?id=${isUserExist?.id}&token=${resetToken}`;

  // const resetUIBody = resetUI(resetUILink);

  // sendEmail(isUserExist.email, resetUIBody);

  console.log(resetUILink);

  return resetUILink;
};

const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string
) => {
  // Verify token
  let verifiedToken = null;

  try {
    verifiedToken = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
  } catch (err) {
    throw new ApiError(StatusCodes.FORBIDDEN, "Invalid token");
  }

  const { userId } = verifiedToken;

  // Check user is exist
  const isUserExist = await User.findOne({ id: userId }).select("+password");

  if (!isUserExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }

  // check user is same
  const isSameUser = payload?.id === userId;
  if (!isSameUser) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized access");
  }

  // Update password
  isUserExist.needsPasswordChange = false;
  isUserExist.password = payload?.newPassword;
  await isUserExist.save();
};

export const authService = {
  loginUser,
  refreshToken,
  changePassword,
  forgetPassword,
  resetPassword,
};
