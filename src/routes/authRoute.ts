import { Router } from "express";
import { googleCallBack } from "../controller/auth/googleCallBack";
import { googleLogInStart } from "../controller/auth/googleLoginStart";
import { isLoggedIn } from "../controller/auth/isLoggedIn";
import { login } from "../controller/auth/logIn";
import { logout } from "../controller/auth/logout";
import { signup } from "../controller/auth/singUp";
import { authMiddleware } from "../middleware/authMiddleware";

const authRoutes = Router();

// Create User / Sign Up
authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.get("/isloggedin",authMiddleware, isLoggedIn)
authRoutes.get("/google",googleLogInStart)
authRoutes.get("/google/callback",googleCallBack)


export default authRoutes;
