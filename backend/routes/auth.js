import express from "express"
import nodemailer from "nodemailer"

const router = express.Router()

// Store email -> { code, expiresAt }
const codes = new Map()

// Generate 6-digit code and send email
router.post("/send-code", async (req, res) => {
  const { email } = req.body

  // Generate random 6-digit number as string
  const code = Math.floor(100000 + Math.random() * 900000).toString()

  // Code expires 5 minutes from now
  const expiresAt = Date.now() + 5 * 60 * 1000
  codes.set(email, { code, expiresAt })

  // Setup email transport
  const transporter = nodemailer.createTransport({
    service: "gmail", // or another email provider
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  try {
    await transporter.sendMail({
      from: '"Wedding Website" <no-reply@wedding.com>',
      to: email,
      subject: "Your Wedding Website Login Code",
      text: `Your 6-digit login code is: ${code}\n\nThis code will expire in 5 minutes.`,
    })

    console.log(`Code ${code} sent to ${email}`)

    res.json({ success: true })
  } catch (err) {
    console.error("Email send failed:", err)
    res.json({ success: false, message: "Failed to send code" })
  }
})

// Verify the code
router.post("/verify-code", (req, res) => {
  const { email, code } = req.body
  const record = codes.get(email)

  if (!record) {
    return res.json({ success: false, message: "No code found. Please request a new one." })
  }

  const { code: validCode, expiresAt } = record

  // Check expiry
  if (Date.now() > expiresAt) {
    codes.delete(email)
    return res.json({ success: false, message: "Code expired. Please request a new one." })
  }

  // Check if code matches
  if (code === validCode) {
    codes.delete(email) // one-time use
    console.log(`✅ ${email} successfully logged in`)
    return res.json({ success: true })
  }

  res.json({ success: false, message: "Invalid code." })
})

// Background cleanup every 10 minutes
setInterval(() => {
  const now = Date.now()
  for (const [email, { expiresAt }] of codes) {
    if (now > expiresAt) {
      codes.delete(email)
    }
  }
}, 10 * 60 * 1000)

export default router
