import express from "express"
import nodemailer from "nodemailer"
import bcrypt from "bcryptjs"

const router = express.Router()

// Temporary in-memory user store and code store
const users = new Map() // email -> { firstName, lastName, passwordHash }
const codes = new Map() // email -> { code, expiresAt, nextAllowedAt }

/* ---------------------- REGISTER (Create Account) ---------------------- */
router.post("/register", async (req, res) => {
  const { email, firstName, lastName, password } = req.body
  if (!email || !password || !firstName || !lastName)
    return res.json({ success: false, message: "Missing required fields." })

  if (users.has(email)) {
    return res.json({ success: false, message: "Account already exists." })
  }

  const passwordHash = await bcrypt.hash(password, 10)
  users.set(email, { firstName, lastName, passwordHash })
  console.log(`✅ New user created: ${email}`)
  res.json({ success: true })
})

/* ------------------------ PASSWORD LOGIN ------------------------------- */
router.post("/login", async (req, res) => {
  const { email, password } = req.body
  const user = users.get(email)
  if (!user) return res.json({ success: false, message: "User not found." })

  const valid = await bcrypt.compare(password, user.passwordHash)
  if (!valid) return res.json({ success: false, message: "Incorrect password." })

  console.log(`🔓 ${email} logged in with password`)
  res.json({ success: true })
})

/* ------------------------ SEND 6-DIGIT CODE ---------------------------- */
router.post("/send-code", async (req, res) => {
  const { email } = req.body
  if (!users.has(email))
    return res.json({ success: false, message: "No account found for this email." })

  const now = Date.now()
  const existing = codes.get(email)
  if (existing && now < (existing.nextAllowedAt || 0)) {
    return res.json({ success: false, message: "Please wait before requesting another code." })
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString()
  const expiresAt = now + 5 * 60 * 1000
  const nextAllowedAt = now + 30 * 1000
  codes.set(email, { code, expiresAt, nextAllowedAt })

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  })

  try {
    await transporter.sendMail({
      from: '"Wedding Website" <no-reply@wedding.com>',
      to: email,
      subject: "Your Wedding Website Login Code",
      text: `Your 6-digit login code is: ${code}\n\nThis code will expire in 5 minutes.`,
    })
    console.log(`📧 Code ${code} sent to ${email}`)
    res.json({ success: true })
  } catch (err) {
    console.error("Email send failed:", err)
    res.json({ success: false, message: "Failed to send code." })
  }
})

/* ------------------------ VERIFY 6-DIGIT CODE -------------------------- */
router.post("/verify-code", (req, res) => {
  const { email, code } = req.body
  const record = codes.get(email)
  if (!record) return res.json({ success: false, message: "No code found." })

  const { code: validCode, expiresAt } = record
  if (Date.now() > expiresAt) {
    codes.delete(email)
    return res.json({ success: false, message: "Code expired. Please request a new one." })
  }

  if (code === validCode) {
    codes.delete(email)
    console.log(`✅ ${email} logged in via magic code`)
    return res.json({ success: true })
  }

  res.json({ success: false, message: "Invalid code." })
})

export default router
