// controller/netWorthController/updateNetworth.ts
import { Request, Response } from "express";
import { prisma } from "../../config/db";

export const updateNetworthEntry = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const userId = req.user.userId;
    const { id } = req.params;
    const { accountType, accountName, balance, snapshotDate } = req.body;

    // Check if entry exists & belongs to user
    const existing = await prisma.networthEntry.findUnique({ where: { id }});
    if (!existing || existing.userId !== userId) {
      return res.status(404).json({ message: "Entry not found" });
    }

    const data: any = {};

    if (accountType !== undefined) data.accountType = accountType;
    if (accountName !== undefined) data.accountName = accountName;
    if (balance !== undefined) data.balance = Number(balance);
    if (snapshotDate !== undefined)
      data.snapshotDate = new Date(snapshotDate);

    const updated = await prisma.networthEntry.update({
      where: { id },
      data,
    });

    return res.json({ message: "Entry updated", updated });
  } catch (err) {
    console.error("Update error:", err);
    return res.status(500).json({ message: "Error updating entry" });
  }
};
