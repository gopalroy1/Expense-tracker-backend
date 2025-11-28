import { Request, Response } from "express";
import { prisma } from "../../config/db";

export const addAccountName = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const userId = req.user.userId; 
    const { accountTypeId, name } = req.body;

    if (!accountTypeId || !name) {
      return res.status(400).json({ error: "accountTypeId and name are required" });
    }

    // Ensure the accountType belongs to the user
    const accountType = await prisma.accountType.findFirst({
      where: { id: accountTypeId, userId }
    });

    if (!accountType) {
      return res.status(404).json({ error: "Account type not found" });
    }

    const accountName = await prisma.accountName.create({
      data: {
        accountTypeId,
        name,
      },
    });

    return res.json({
      message: "Account name added",
      accountName,
    });
  } catch (err: any) {

    // Unique constraint for name + accountTypeId
    if (err.code === "P2002") {
      return res.status(400).json({
        error: "This account name already exists under this account type",
      });
    }

    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
