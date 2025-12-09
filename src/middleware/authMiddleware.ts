import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  console.log("🔐 Auth middleware called");

  let token: string | undefined;

  // 1️⃣ Prefer Authorization header
  if (req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  // 2️⃣ Fallback to cookie if no header present
  if (!token && req.cookies?.token) {
    console.log("No header token")
    token = req.cookies.token;
  }

  // 3️⃣ If still no token → reject
  if (!token) {
    console.log("Token not present")
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    console.log("token before verify",{token})
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    req.user = decoded.userId || decoded.id || decoded; // support multiple formats

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
