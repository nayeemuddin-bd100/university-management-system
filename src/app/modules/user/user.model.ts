/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../../../config";
import { IUser, UserModel } from "./user.interface";

const userSchema = new Schema<IUser, UserModel>(
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

// instance Method
// userSchema.methods.isUserExist = async function (
//   id: string
// ): Promise<Partial<IUser> | null> {
//   const user = await User.findOne(
//     { id },
//     { id: 1, password: 1, needsPasswordChange: 1 }
//   );

//   return user;
// };

// // check password
// userSchema.methods.isPasswordMatch = async function (
//   givenPassword: string,
//   savedPassword: string
// ): Promise<boolean> {
//   const isPasswordMatched = await bcrypt.compare(givenPassword, savedPassword);

//   return isPasswordMatched;
// };

// static Method
userSchema.statics.isUserExist = async function (
  id: string
): Promise<Pick<
  IUser,
  "id" | "password" | "role" | "needsPasswordChange"
> | null> {
  const user = await User.findOne(
    { id },
    { id: 1, password: 1, needsPasswordChange: 1 }
  );

  return user;
};

userSchema.statics.isPasswordMatch = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  const isPasswordMatched = await bcrypt.compare(givenPassword, savedPassword);

  return isPasswordMatched;
};

// hash password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round)
  );

  next();
});

export const User = model<IUser, UserModel>("User", userSchema);
