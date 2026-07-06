import jwt, { type JwtPayload, type Secret } from "jsonwebtoken";
import type { StringValue } from "ms";

const createToken = (
  payload: object,
  secret: Secret,
  expiresIn: StringValue
) => {
  return jwt.sign(payload, secret, {
    expiresIn,
  });
};

const verifyToken = (token: string, secret: Secret) => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelper = {
  createToken,
  verifyToken,
};