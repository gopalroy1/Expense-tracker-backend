import { Router } from "express";
import { getEmails } from "../controller/email/getEmails";
import { authMiddleware } from "../middleware/authMiddleware";

const emailRouter = Router();

emailRouter.get("/", authMiddleware, getEmails);

export default emailRouter;
