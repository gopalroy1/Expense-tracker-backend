import { Request, Response } from "express";
import { prisma } from "../../config/db";

export const deleteAccountName = async (req: Request, res: Response) => {
    try {
      console.log("the delete account name api called",req.params.id)
    const id = req.params.id;

    await prisma.accountName.delete({ where: { id } });

    res.json({ message: "Account name deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
