import jwt, { Secret } from "jsonwebtoken";

const createToken = (
  payload: object,
  secret: Secret,
  expiresTime: string
): string => {
  return jwt.sign(payload, secret, { expiresIn: expiresTime });
};

export const jwtHelpers = {
  createToken,
};
