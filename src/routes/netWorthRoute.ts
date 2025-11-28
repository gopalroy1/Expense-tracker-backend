import { Router } from "express";
import { addNetworthEntry } from "../controller/netWorthController/addNetworth";
import { deleteNetworthEntry } from "../controller/netWorthController/deleteNetworthEntry";
import { getNetworthByMonth } from "../controller/netWorthController/getByMonth";
import { updateNetworthEntry } from "../controller/netWorthController/updateNetworthEntry";
import { authMiddleware } from "../middleware/authMiddleware";


const netWorthRoutes = Router();

netWorthRoutes.post("/add", authMiddleware,addNetworthEntry);
netWorthRoutes.get("/getmonth", authMiddleware, getNetworthByMonth);
netWorthRoutes.put("/update/:id", authMiddleware, updateNetworthEntry);
netWorthRoutes.delete("/delete/:id", authMiddleware, deleteNetworthEntry);

export default netWorthRoutes;
