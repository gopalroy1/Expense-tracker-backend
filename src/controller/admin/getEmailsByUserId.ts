import { Response } from "express";
import { AuthRequest } from "../../middleware/authMiddleware";
import { findEmailsByUserId } from "../../repositories/email/findEmailsByUserId";

export const getEmailsByUserId = async (req: AuthRequest, res: Response) => {
    try {
        const { userId } = req.params;
        const { from: fromStr, to: toStr } = req.query as { from?: string; to?: string };

        let from: Date | undefined;
        let to: Date | undefined;

        if (fromStr && toStr) {
            from = new Date(`${fromStr}T00:00:00.000Z`);
            to = new Date(`${toStr}T00:00:00.000Z`);

            if (isNaN(from.getTime()) || isNaN(to.getTime())) {
                return res.status(400).json({ error: "Invalid date format. Use YYYY-MM-DD" });
            }
            if (from > to) {
                return res.status(400).json({ error: "from must be before or equal to to" });
            }
        }

        const emails = await findEmailsByUserId(userId, from, to);
        return res.status(200).json({ emails, count: emails.length, userId });
    } catch (err: any) {
        console.error("getEmailsByUserId error:", err.message);
        return res.status(500).json({ error: "Failed to fetch emails" });
    }
};
