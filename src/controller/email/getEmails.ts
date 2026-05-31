import { Response } from "express";
import { MAX_EMAIL_DAYS } from "../../constants/email";
import { AuthRequest } from "../../middleware/authMiddleware";
import { getEmailsService } from "../../services/email/getEmailsService";
import { GmailAuthError } from "../../utils/errors/GmailAuthError";

export const getEmails = async (req: AuthRequest, res: Response) => {
    try {
        console.log("Get raw emails called");
        const userId = req.user as string;
        const { from: fromStr, to: toStr } = req.query as {
            from?: string;
            to?: string;
        };

        if (!fromStr || !toStr) {
            return res
                .status(400)
                .json({ error: "from and to query params are required (YYYY-MM-DD)" });
        }

        const from = new Date(`${fromStr}T00:00:00.000Z`);
        const to = new Date(`${toStr}T00:00:00.000Z`);

        if (isNaN(from.getTime()) || isNaN(to.getTime())) {
            return res
                .status(400)
                .json({ error: "Invalid date format. Use YYYY-MM-DD" });
        }

        if (from > to) {
            return res
                .status(400)
                .json({ error: "from must be before or equal to to" });
        }

        const today = new Date(
            Date.UTC(
                new Date().getUTCFullYear(),
                new Date().getUTCMonth(),
                new Date().getUTCDate()
            )
        );

        if (to > today) {
            return res
                .status(400)
                .json({ error: "Cannot fetch emails for future dates" });
        }

        const totalDays =
            Math.round((to.getTime() - from.getTime()) / 86400000) + 1;

        if (totalDays > MAX_EMAIL_DAYS) {
            return res
                .status(400)
                .json({ error: `Date range cannot exceed ${MAX_EMAIL_DAYS} days` });
        }
        console.log("Basic validations passed, fetching emails...",userId, fromStr, toStr);
        const emails = await getEmailsService(userId, from, to);
        return res.status(200).json({ emails, count: emails.length, from: fromStr, to: toStr });
    } catch (err: any) {
        if (err instanceof GmailAuthError) {
            return res.status(401).json({ error: err.message });
        }
        console.error("getEmails error:", err.message);
        return res.status(500).json({ error: "Failed to fetch emails" });
    }
};
