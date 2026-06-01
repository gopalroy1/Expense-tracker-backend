import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../config/db";
import { AuthRequest } from "./authMiddleware";

export const adminMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token: string | undefined;

    if (req.headers.authorization?.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token && req.cookies?.token) {
        token = req.cookies.token;
    }
    if (!token) {
        return res.status(401).json({ error: "Not authenticated" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
        const userId = decoded.userId || decoded.id || decoded;

        const user = await prisma.user.findUnique({ where: { id: userId }, select: { id: true, isAdmin: true } });
        if (!user || !user.isAdmin) {
            return res.status(403).json({ error: "Admin access required" });
        }

        req.user = userId;
        next();
    } catch {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};
