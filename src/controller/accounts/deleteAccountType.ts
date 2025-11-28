import { Request, Response } from "express";
import { prisma } from "../../config/db";

export const deleteAccountType = async (req: Request, res: Response) => {
    try {
    const id = req.params.id;

    await prisma.accountType.delete({ where: { id } });

    res.json({ message: "Account type deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
