import { Request, Response } from "express";
import { prisma } from "../../config/db";

// POST /account/type
export const addAccountType = async (req: Request, res: Response) => {
  try {
      // console.log("The req ",{req})
      //@ts-ignore
    const userId = req.user; // from auth middleware
    console.log("userId from the middleware", userId);
    const { type } = req.body;

    if (!type) {
      return res.status(400).json({ error: "Account type is required" });
    }

    const accountType = await prisma.accountType.create({
      data: {
        userId,
        type,
      },
    });

    res.json({ message: "Account type created", accountType });
  } catch (err: any) {
    if (err.code === "P2002") {
      return res
        .status(400)
        .json({ error: "This account type already exists for this user" });
    }

    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
