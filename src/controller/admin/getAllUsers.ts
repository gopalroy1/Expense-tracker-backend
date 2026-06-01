import { Response } from "express";
import { AuthRequest } from "../../middleware/authMiddleware";
import { findAllUsers } from "../../repositories/user/findAllUsers";

export const getAllUsers = async (req: AuthRequest, res: Response) => {
    try {
        const users = await findAllUsers();
        return res.status(200).json({ users, count: users.length });
    } catch (err: any) {
        console.error("getAllUsers error:", err.message);
        return res.status(500).json({ error: "Failed to fetch users" });
    }
};
