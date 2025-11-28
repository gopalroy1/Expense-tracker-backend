import { Request, Response } from "express";
import { prisma } from "../../config/db";

export const updateAccountType = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { type } = req.body;

    if (!type) {
      return res.status(400).json({ error: "Type is required" });
    }

    const updated = await prisma.accountType.update({
      where: { id },
      data: { type },
    });

    res.json({ message: "Account type updated", updated });
  } catch (err: any) {
    if (err.code === "P2002") {
      return res.status(400).json({ error: "Type must be unique for the user" });
    }

    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
