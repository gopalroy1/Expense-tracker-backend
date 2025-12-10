// controller/netWorthController/deleteNetworth.ts
import { Request, Response } from "express";
import { prisma } from "../../config/db";

export const deleteNetworthEntry = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    console.log("Delete entry called",req.user);
    //@ts-ignore
    const userId = req.user;
    const { id } = req.params;

    const entry = await prisma.networthEntry.findUnique({ where: { id } });


    if (!entry || entry.userId !== userId) {
      console.log({id},userId,entry)
      return res.status(404).json({ message: "Entry not found" });
    }

    await prisma.networthEntry.delete({
      where: { id },
    });

    return res.json({ message: "Entry deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    return res.status(500).json({ message: "Error deleting entry" });
  }
};
