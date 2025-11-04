import express from "express";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";


const router = express.Router();
const prisma = new PrismaClient();

// Transporter using Gmail creds from .env
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// --- SEND LOGIN CODE ---
router.post("/send-code", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: "Email is required." });

    // Generate random 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Set expiry time (10 minutes from now)
    const expiry = new Date(Date.now() + 10 * 60 * 1000);

    // Upsert (update if exists, else create)
    const user = await prisma.user.upsert({
      where: { email },
      update: { code, codeExpiry: expiry },
      create: { email, code, codeExpiry: expiry },
    });

    // Send email
    await transporter.sendMail({
      from: `"Wedding Planner" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Wedding Site Login Code 💍",
      html: `<p>Your login code is:</p>
             <h2 style="color:#ff6b00;font-family:sans-serif;">${code}</h2>
             <p>This code will expire in 10 minutes.</p>`,
    });

    res.json({ success: true, message: "Code sent successfully!" });
  } catch (err) {
    console.error("Error sending code:", err);
    res.status(500).json({ success: false, message: "Failed to send code." });
  }
});

// --- VERIFY CODE ---
router.post("/verify-code", async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email || !code)
      return res.status(400).json({ success: false, message: "Email and code are required." });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.code !== code)
      return res.status(401).json({ success: false, message: "Invalid code." });

    if (user.codeExpiry && user.codeExpiry < new Date())
      return res.status(401).json({ success: false, message: "Code expired." });

    // Generate JWT (valid 1 day)
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    // Clear the used code
    await prisma.user.update({
      where: { email },
      data: { code: null, codeExpiry: null },
    });

    res.json({ success: true, token });
  } catch (err) {
    console.error("Error verifying code:", err);
    res.status(500).json({ success: false, message: "Verification failed." });
  }
});

export default router;