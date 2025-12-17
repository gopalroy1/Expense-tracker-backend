import { Router } from "express";
import { categoryTrend } from "../controller/dashboard/categoryTrend";
import { monthlySnapshot } from "../controller/dashboard/monthlySnapshot";
import { netWorthTrend } from "../controller/dashboard/netWorthTrend";
import { authMiddleware } from "../middleware/authMiddleware";


const dashboardRoutes = Router();

dashboardRoutes.get("/snapshot", authMiddleware,monthlySnapshot);
dashboardRoutes.get("/networth-trend", authMiddleware, netWorthTrend);
dashboardRoutes.get("/category-trend", authMiddleware, categoryTrend);


export default dashboardRoutes;
