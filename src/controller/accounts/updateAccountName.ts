import { Request, Response } from "express";
import { prisma } from "../../config/db";

export const updateAccountName = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const updated = await prisma.accountName.update({
      where: { id },
      data: { name },
    });

    res.json({ message: "Account name updated", updated });
  } catch (err: any) {
    if (err.code === "P2002") {
      return res.status(400).json({ error: "Name must be unique for this type" });
    }

    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
