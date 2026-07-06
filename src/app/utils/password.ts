import bcrypt from "bcrypt";
import { envConfig } from "../config";

const hashPassword = async (plainPassword: string) => {
  return await bcrypt.hash(
    plainPassword,
    Number(envConfig.BCRYPT_SALT_ROUNDS)
  );
};

const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const passwordHelper = {
  hashPassword,
  comparePassword,
};