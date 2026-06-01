import { Router } from "express";
import { getAllUsers } from "../controller/admin/getAllUsers";
import { getEmailsByUserId } from "../controller/admin/getEmailsByUserId";
import { getTransactionsByUserId } from "../controller/admin/getTransactionsByUserId";
import { adminMiddleware } from "../middleware/adminMiddleware";

const adminRouter = Router();

adminRouter.get("/users", adminMiddleware, getAllUsers);
adminRouter.get("/emails/:userId", adminMiddleware, getEmailsByUserId);
adminRouter.get("/transactions/:userId", adminMiddleware, getTransactionsByUserId);

export default adminRouter;
