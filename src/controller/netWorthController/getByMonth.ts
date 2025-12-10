import { Request, Response } from "express";
import { prisma } from "../../config/db";

export const getNetworthByMonth = async (req: Request, res: Response) => {
    try {
      //@ts-ignore
        const userId = req.user;
        //@ts-ignore

        const { month ,year} = req.query;
        console.log("the month is",month,req?.query)

    if (!month) {
      return res.status(400).json({ message: "month is required (YYYY-MM)" });
    }

      //@ts-ignore
  const start = new Date(Date.UTC(year, month - 1, 1));

      // Start of next month (UTC)
            //@ts-ignore
const end = new Date(Date.UTC(year, month, 1));
    end.setMonth(end.getMonth() + 1);

    const entries = await prisma.networthEntry.findMany({
      where: {
        userId,
        snapshotDate: {
          gte: start,
          lt: end,
        },
      },
      orderBy: { snapshotDate: "desc" },
    });

    return res.json({ entries });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching monthly entries" });
  }
};
