import { UserRole, UserStatus } from "@prisma/client";
import { prisma } from "../../config";
import { envConfig } from "../../config";
import { jwtHelper, passwordHelper } from "../../utils";
import AppError from "../../errors/AppError";
import { TRegisterUser } from "./auth.type";
import { StringValue } from "ms";
import { StatusCodes } from "http-status-codes";
import type { TLoginUser } from "./auth.type";


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

const loginUser = async (payload: TLoginUser) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!user) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "User does not exist"
    );
  }

if (user.status === UserStatus.SUSPENDED) {
  throw new AppError(
    StatusCodes.FORBIDDEN,
    "Your account has been suspended"
  );
}

  const isPasswordMatched =
    await passwordHelper.comparePassword(
      payload.password,
      user.password
    );

  if (!isPasswordMatched) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      "Invalid credentials"
    );
  }

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
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    },
  };
};

export const AuthService = {
  registerUser,
  loginUser
};