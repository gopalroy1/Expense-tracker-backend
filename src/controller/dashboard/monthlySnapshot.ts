import { Request, Response } from "express";
import { prisma } from "../../config/db";

/* ----------------------------------------
   Helpers
---------------------------------------- */

function aggregateBalances(entries: { balance: number }[]) {
  let netWorth = 0;
  let totalPositive = 0;
  let totalNegative = 0;

  for (const e of entries) {
    netWorth += e.balance;
    if (e.balance > 0) totalPositive += e.balance;
    if (e.balance < 0) totalNegative += Math.abs(e.balance);
  }

  return {
    netWorth,
    totalPositive,
    totalNegative,
  };
}

function getMonthBounds(year: number, month: number) {
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 1);
  return { start, end };
}

/* ----------------------------------------
   Controller
---------------------------------------- */

export const monthlySnapshot = async (req: Request, res: Response) => {
  // @ts-ignore – set by auth middleware
  const userId = req.user;

  const yearParam = req.query.year ? Number(req.query.year) : null;
  const monthParam = req.query.month ? Number(req.query.month) : null;

  try {
    /* ----------------------------------------
       1. Resolve TARGET MONTH
    ---------------------------------------- */

    let targetYear: number;
    let targetMonth: number;

    if (yearParam && monthParam) {
      // Explicit month requested
      targetYear = yearParam;
      targetMonth = monthParam;
    } else {
      // Auto-detect latest month from data
      const latest = await prisma.networthEntry.findFirst({
        where: { userId },
        orderBy: { snapshotDate: "desc" },
        select: { snapshotDate: true },
      });

      if (!latest) {
        // ❌ No data at all
        return res.json({
          snapshotMonth: null,
          current: {
            netWorth: 0,
            totalPositive: 0,
            totalNegative: 0,
          },
          previous: null,
        });
      }

      targetYear = latest.snapshotDate.getFullYear();
      targetMonth = latest.snapshotDate.getMonth() + 1;
    }

    const { start: monthStart, end: monthEnd } =
      getMonthBounds(targetYear, targetMonth);

    /* ----------------------------------------
       2. Get LATEST SNAPSHOT IN TARGET MONTH
    ---------------------------------------- */

    const targetSnapshot = await prisma.networthEntry.findFirst({
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

    if (!targetSnapshot) {
      // Month requested but no data in that month
      return res.json({
        snapshotMonth: `${targetYear}-${String(targetMonth).padStart(2, "0")}`,
        current: {
          netWorth: 0,
          totalPositive: 0,
          totalNegative: 0,
        },
        previous: null,
      });
    }

    const currentEntries = await prisma.networthEntry.findMany({
      where: {
        userId,
        snapshotDate: targetSnapshot.snapshotDate,
      },
      select: { balance: true },
    });

    const current = aggregateBalances(currentEntries);

    /* ----------------------------------------
       3. Resolve PREVIOUS MONTH SNAPSHOT
    ---------------------------------------- */

    const previousMonthStart = new Date(
      targetYear,
      targetMonth - 2,
      1
    );

    const previousSnapshot = await prisma.networthEntry.findFirst({
      where: {
        userId,
        snapshotDate: { lt: monthStart },
      },
      orderBy: { snapshotDate: "desc" },
      select: { snapshotDate: true },
    });

    let previous = null;

    if (previousSnapshot) {
      const prevEntries = await prisma.networthEntry.findMany({
        where: {
          userId,
          snapshotDate: previousSnapshot.snapshotDate,
        },
        select: { balance: true },
      });

      previous = {
        snapshotDate: previousSnapshot.snapshotDate,
        ...aggregateBalances(prevEntries),
      };
    }

    /* ----------------------------------------
       4. Response
    ---------------------------------------- */

    res.json({
      snapshotMonth: `${targetYear}-${String(targetMonth).padStart(2, "0")}`,
      snapshotDate: targetSnapshot.snapshotDate,
      current,
      previous,
    });
  } catch (error) {
    console.error("Monthly snapshot error:", error);
    res.status(500).json({ error: "Failed to fetch snapshot" });
  }
};
