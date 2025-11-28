import { Router } from "express";
import { addAccountName } from "../controller/accounts/addAccountName";
import { addAccountType } from "../controller/accounts/addAccountType";
import { deleteAccountName } from "../controller/accounts/deleteAccountName";
import { deleteAccountType } from "../controller/accounts/deleteAccountType";
import { getAllAccounts } from "../controller/accounts/getAll";
import { updateAccountName } from "../controller/accounts/updateAccountName";
import { updateAccountType } from "../controller/accounts/updateAccountType";
import { authMiddleware } from "../middleware/authMiddleware";

const accountRoutes = Router();

accountRoutes.post("/addaccount",authMiddleware, addAccountType);
accountRoutes.post("/addaccountname",authMiddleware, addAccountName);
accountRoutes.get("/getall",authMiddleware, getAllAccounts);
accountRoutes.delete("/type/:id", authMiddleware, deleteAccountType);
accountRoutes.delete("/name/:id", authMiddleware, deleteAccountName);
accountRoutes.put("/type/:id", authMiddleware, updateAccountType);
accountRoutes.put("/name/:id", authMiddleware, updateAccountName);


export default accountRoutes;
