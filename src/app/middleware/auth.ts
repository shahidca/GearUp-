import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { UserRole, UserStatus } from "@prisma/client";

import AppError from "../errors/AppError";
import { envConfig, prisma } from "../config";

const auth =
  (...requiredRoles: UserRole[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 1. Get Authorization Header
      const authorization = req.headers.authorization;

      if (!authorization) {
        throw new AppError(
          StatusCodes.UNAUTHORIZED,
          "You are not authorized!"
        );
      }

      // 2. Check Bearer Format
      if (!authorization.startsWith("Bearer ")) {
        throw new AppError(
          StatusCodes.UNAUTHORIZED,
          "Invalid authorization header"
        );
      }

      // 3. Extract Token
      const token = authorization.split(" ")[1];

      // 4. Verify Token
      const decoded = jwt.verify(
        token,
        envConfig.JWT_ACCESS_SECRET
      ) as JwtPayload;

      // 5. Find User
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

      // 6. Check User Status
      if (user.status === UserStatus.SUSPENDED) {
        throw new AppError(
          StatusCodes.FORBIDDEN,
          "Your account has been suspended"
        );
      }

      // 7. Check Role
      if (
        requiredRoles.length > 0 &&
        !requiredRoles.includes(user.role)
      ) {
        throw new AppError(
          StatusCodes.FORBIDDEN,
          "Forbidden Access"
        );
      }

      // 8. Attach User Information
      req.user = {
        userId: user.id,
        email: user.email,
        role: user.role,
      };

      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return next(
          new AppError(
            StatusCodes.UNAUTHORIZED,
            "Token has expired"
          )
        );
      }

      if (error instanceof jwt.JsonWebTokenError) {
        return next(
          new AppError(
            StatusCodes.UNAUTHORIZED,
            "Invalid token"
          )
        );
      }

      next(error);
    }
  };

export default auth;