import { Request, Response } from "express";
import { prisma } from "../../config/db";

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export const netWorthTrend = async (req: Request, res: Response) => {
  // @ts-ignore – set by auth middleware
  const userId = req.user;

  const yearParam = req.query.year ? Number(req.query.year) : null;

  try {
    /* ----------------------------------------
       1. Resolve target year
    ---------------------------------------- */

    let targetYear: number;

    if (yearParam) {
      targetYear = yearParam;
    } else {
      const latest = await prisma.networthEntry.findFirst({
        where: { userId },
        orderBy: { snapshotDate: "desc" },
        select: { snapshotDate: true },
      });

      if (!latest) {
        // ❌ No data at all
        return res.json({
          year: null,
          data: [],
        });
      }

      targetYear = latest.snapshotDate.getFullYear();
    }

    /* ----------------------------------------
       2. Build trend month by month
    ---------------------------------------- */

    const trendData = [];

    for (let month = 1; month <= 12; month++) {
      const monthStart = new Date(targetYear, month - 1, 1);
      const monthEnd = new Date(targetYear, month, 1);

      // Latest snapshot in this month
      const snapshot = await prisma.networthEntry.findFirst({
        where: {
          userId,
          snapshotDate: {
            gte: monthStart,
            lt: monthEnd,
          },
        },
        orderBy: { snapshotDate: "desc" },
        select: { snapshotDate: true },
      });

      if (!snapshot) continue;

      const entries = await prisma.networthEntry.findMany({
        where: {
          userId,
          snapshotDate: snapshot.snapshotDate,
        },
        select: { balance: true },
      });

      const netWorth = entries.reduce(
        (sum, e) => sum + e.balance,
        0
      );

      trendData.push({
        month,
        label: MONTH_LABELS[month - 1],
        netWorth,
        snapshotDate: snapshot.snapshotDate.toISOString(),
      });
    }

    /* ----------------------------------------
       3. Response
    ---------------------------------------- */

    res.json({
      year: targetYear,
      data: trendData,
    });
  } catch (error) {
    console.error("Net worth trend error:", error);
    res.status(500).json({ error: "Failed to fetch net worth trend" });
  }
};
