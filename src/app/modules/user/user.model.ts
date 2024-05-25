/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../../../config";
import { IUser, IUserMethods, UserModel } from "./user.interface";

const userSchema = new Schema<IUser, Record<string, never>, IUserMethods>(
  {
    id: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: { type: String, required: true, select: 0 },
    needsPasswordChange: { type: Boolean, default: true },
    student: { type: Schema.Types.ObjectId, ref: "Student" },
    faculty: { type: Schema.Types.ObjectId, references: "Faculty" },
    admin: { type: Schema.Types.ObjectId, references: "Admin" },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.methods.isUserExist = async function (
  id: string
): Promise<Partial<IUser> | null> {
  const user = await User.findOne(
    { id },
    { id: 1, password: 1, needsPasswordChange: 1 }
  );

  return user;
};

//   check password
userSchema.methods.isPasswordMatch = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  const isPasswordMatched = await bcrypt.compare(givenPassword, savedPassword);

  return isPasswordMatched;
};

userSchema.pre("save", async function (next) {
  const user = this;
  console.log(user);

  //hash password
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round)
  );

  next();
});

export const User = model<IUser, UserModel>("User", userSchema);
