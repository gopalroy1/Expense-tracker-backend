import { Request, Response } from "express";
import { prisma } from "../../config/db";

export const getAllAccounts = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const userId = req.user.userId;

    const accountTypes = await prisma.accountType.findMany({
      where: { userId },
      include: {
        accountNames: true,   // includes all linked account names
      },
      orderBy: {
        type: "asc", // optional: alphabetical sorting
      },
    });

    return res.json({ accountTypes });
  } catch (err) {
    console.error("Error fetching account structure:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
