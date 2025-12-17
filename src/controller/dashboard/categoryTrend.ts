import { Request, Response } from "express";
import { prisma } from "../../config/db";

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export const categoryTrend = async (req: Request, res: Response) => {
  // @ts-ignore – set by auth middleware
  const userId = req.user;

  const categoryParam = req.query.category as string | undefined;
    const yearParam = req.query.year ? Number(req.query.year) : null;
    console.log("Called category wise trend")

  try {
    /* ----------------------------------------
       1. Resolve target year (same as netWorthTrend)
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
        return res.json({
          year: null,
          defaultCategory: null,
          months: [],
          labels: [],
          categoryTrend: [],
          subCategoryTrend: {},
        });
      }

      targetYear = latest.snapshotDate.getFullYear();
    }

    /* ----------------------------------------
       2. Resolve default category
    ---------------------------------------- */

    let category = categoryParam;

    if (!category) {
      const latestSnapshot = await prisma.networthEntry.findFirst({
        where: { userId },
        orderBy: { snapshotDate: "desc" },
        select: { snapshotDate: true },
      });

      if (!latestSnapshot) {
        return res.status(404).json({ error: "No data found" });
      }

      const topCategory = await prisma.networthEntry.groupBy({
        by: ["accountType"],
        where: {
          userId,
          snapshotDate: latestSnapshot.snapshotDate,
        },
        _sum: { balance: true },
        orderBy: {
          _sum: { balance: "desc" },
        },
        take: 1,
      });

      category = topCategory[0]?.accountType;
    }

    /* ----------------------------------------
       3. Build trend month by month
    ---------------------------------------- */

    const months: number[] = [];
    const labels: string[] = [];
    const categoryTrend: number[] = [];
    const subCategoryTrend: Record<string, number[]> = {};

    for (let month = 1; month <= 12; month++) {
      const monthStart = new Date(targetYear, month - 1, 1);
      const monthEnd = new Date(targetYear, month, 1);

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
          accountType: category,
        },
        select: {
          accountName: true,
          balance: true,
        },
      });

      if (!entries.length) continue;

      months.push(month);
      labels.push(MONTH_LABELS[month - 1]);

      const categoryTotal = entries.reduce(
        (sum, e) => sum + e.balance,
        0
      );

      categoryTrend.push(categoryTotal);

      for (const entry of entries) {
        if (!subCategoryTrend[entry.accountName]) {
          subCategoryTrend[entry.accountName] = [];
        }
        subCategoryTrend[entry.accountName].push(entry.balance);
      }
    }

    /* ----------------------------------------
       4. Response
    ---------------------------------------- */

    res.json({
      year: targetYear,
      defaultCategory: category,
      months,
      labels,
      categoryTrend,
      subCategoryTrend,
    });
  } catch (error) {
    console.error("Category trend error:", error);
    res.status(500).json({ error: "Failed to fetch category trend" });
  }
};
