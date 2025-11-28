import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: { id: string };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    console.log("auth middleware called")
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Not authenticated middleware" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    req.user = decoded; // store user id in request
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
