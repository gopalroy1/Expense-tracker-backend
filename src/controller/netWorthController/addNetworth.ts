// controllers/networth.controller.ts
import { Request, Response } from "express";
import { prisma } from "../../config/db";

export const addNetworthEntry = async (req: Request, res: Response) => {
    try {
      //@ts-ignore
    const userId = req.user;
    const { accountType, accountName, balance, snapshotDate } = req.body;

    if (!accountType || !accountName || balance === undefined || !snapshotDate) {
      return res.status(400).json({ message: "Missing fields" });
    }
      console.log("Adding networth entry",{snapshotDate})
    const entry = await prisma.networthEntry.create({
      data: {
        userId,
        accountType,
        accountName,
        balance,
        snapshotDate: new Date(snapshotDate),
      },
    });

    return res.status(201).json({ message: "Entry added", entry });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error adding entry" });
  }
};
