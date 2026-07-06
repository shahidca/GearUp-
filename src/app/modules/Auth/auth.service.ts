import { UserRole } from "@prisma/client";

import { prisma } from "../../config";
import { envConfig } from "../../config";

import { jwtHelper, passwordHelper } from "../../utils";

import AppError from "../../errors/AppError";

import { TRegisterUser } from "./auth.type";

import { StringValue } from "ms";

const registerUser = async (payload: TRegisterUser) => {

  const existingUser = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (existingUser) {
    throw new AppError(409, "User already exists");
  }

  // Hash Password

  const hashedPassword = await passwordHelper.hashPassword(
    payload.password
  );

  // Create User

  const user = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      phone: payload.phone,
      address: payload.address,
      profileImage: payload.profileImage,

      role: UserRole.CUSTOMER,
    },

    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });

  // JWT

  const accessToken = jwtHelper.createToken(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    envConfig.JWT_ACCESS_SECRET,
    envConfig.JWT_ACCESS_EXPIRES_IN as StringValue
  );

  return {
    accessToken,
    user,
  };
};

export const AuthService = {
  registerUser,
};