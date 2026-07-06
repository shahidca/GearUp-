import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { UserRole, UserStatus } from "@prisma/client";
import AppError from "../errors/AppError";
import { envConfig, prisma } from "../config";

const auth = (...requiredRoles: UserRole[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 1. Get Token
      const token = req.headers.authorization;

      if (!token) {
        throw new AppError(
          StatusCodes.UNAUTHORIZED,
          "You are not authorized!"
        );
      }

      // 2. Verify Token
      const decoded = jwt.verify(
        token,
        envConfig.JWT_ACCESS_SECRET
      ) as JwtPayload;

      // 3. Find User
      const user = await prisma.user.findUnique({
        where: {
          id: decoded.userId,
        },
      });

      if (!user) {
        throw new AppError(
          StatusCodes.NOT_FOUND,
          "User not found"
        );
      }

      // 4. Check Status
      if (user.status === UserStatus.SUSPENDED) {
        throw new AppError(
          StatusCodes.FORBIDDEN,
          "User is suspended"
        );
      }

      // 5. Check Role
      if (
        requiredRoles.length &&
        !requiredRoles.includes(user.role)
      ) {
        throw new AppError(
          StatusCodes.FORBIDDEN,
          "Forbidden Access"
        );
      }

      // 6. Attach User
      req.user = decoded;

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;