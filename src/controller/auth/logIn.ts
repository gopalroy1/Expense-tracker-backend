import { Request, Response } from "express";
import { prisma } from "../../config/db";
import { comparePassword } from "../../utils/hash";
import { generateToken } from "../../utils/jwt";


export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verify password
    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT
    const token = generateToken(user.id);
      res.cookie("token", token, {
    httpOnly: true,
    secure: false,//earlier process.env.NODE_ENV === "production"
    sameSite: "none",//Earliaer lax
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

    // Send to frontend
    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
