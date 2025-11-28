import { Request, Response } from "express";
import { prisma } from "../../config/db";
import { hashPassword } from "../../utils/hash";
import { generateToken } from "../../utils/jwt";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, password, city, state, pincode, address, dob } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Check if user already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

      // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        city,
        state,
        pincode,
        address,
        dob: dob ? new Date(dob) : null,
      },
    });

    // Generate JWT token
    const token = generateToken(user.id);
          res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

    // Send response
    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
