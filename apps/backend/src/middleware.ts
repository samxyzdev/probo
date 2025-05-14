import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "./index.js";
import { NextFunction, Request, Response } from "express";

export interface MiddlewareRequest extends Request {
  id: string; // or any other type
}

export function authMiddleware(
  req: MiddlewareRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization;
  if (!token) {
    res.json({
      msg: "Please provide a token",
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded) {
      res.json({
        msg: "You are not authorized",
      });
    }
    if (typeof decoded === "string" || !("id" in decoded)) {
      return res.status(403).json({
        msg: "You are not authorized",
      });
    }
    req.id = (decoded as JwtPayload).id;
    next();
  } catch (e) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
}
