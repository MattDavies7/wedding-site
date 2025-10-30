import { useEffect, useRef, useState } from "react"
import Navbar from "../components/Navbar"

type Step = "email" | "code"

export default function Login() {
  const [step, setStep] = useState<Step>("email")
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [message, setMessage] = useState<null | { type: "success" | "error"; text: string }>(null)
  const [loading, setLoading] = useState(false)

  // resend timer
  const [cooldown, setCooldown] = useState(0)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (cooldown <= 0 && timerRef.current) {
      window.clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [cooldown])

  const startCooldown = (secs = 60) => {
    setCooldown(secs)
    if (timerRef.current) window.clearInterval(timerRef.current)
    timerRef.current = window.setInterval(() => {
      setCooldown((s) => s - 1)
    }, 1000)
  }

  const sendCode = async () => {
    setMessage(null)
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setMessage({ type: "error", text: "Please enter a valid email address." })
      return
    }
    try {
      setLoading(true)
      const res = await fetch("http://localhost:5000/api/auth/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (data.success) {
        setStep("code")
        setMessage({ type: "success", text: "We’ve sent a 6-digit code to your email." })
        startCooldown(60)
      } else {
        setMessage({ type: "error", text: data.message || "Could not send code. Try again." })
      }
    } catch {
      setMessage({ type: "error", text: "Network error. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  const verifyCode = async () => {
    setMessage(null)
    if (!/^\d{6}$/.test(code)) {
      setMessage({ type: "error", text: "Enter the 6-digit code we emailed you." })
      return
    }
    try {
      setLoading(true)
      const res = await fetch("http://localhost:5000/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      })
      const data = await res.json()
      if (data.success) {
        // TODO: set a real session (JWT/cookie). For demo, just redirect:
        window.location.href = "/guestdashboard"
      } else {
        setMessage({ type: "error", text: data.message || "Invalid or expired code." })
      }
    } catch {
      setMessage({ type: "error", text: "Network error. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  const resend = async () => {
    if (cooldown > 0) return
    await sendCode()
  }

  return (
    <div className="min-h-screen flex flex-col bg-orange-50">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-md border border-orange-200/50 p-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Welcome back</h1>
            <p className="text-sm text-gray-600 mb-6">
              Sign in with your email. We’ll send a 6-digit code.
            </p>

            {message && (
              <div
                role="status"
                className={`mb-4 rounded-lg px-3 py-2 text-sm ${
                  message.type === "success"
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {message.text}
              </div>
            )}

            {step === "email" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  sendCode()
                }}
              >
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className="w-full rounded-md border border-gray-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 bg-white px-3 py-2 outline-none"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 w-full rounded-md bg-orange-400 hover:bg-orange-500 disabled:opacity-60 text-white py-2.5 transition"
                >
                  {loading ? "Sending…" : "Next"}
                </button>

                <div className="mt-6 text-center space-y-1">
                  <a href="/register" className="block text-orange-700 hover:underline">
                    Create an Account
                  </a>
                  <a href="/login-password" className="block text-grey-600 hover:text-grey-800">
                    Use password instead
                  </a>
                </div>
              </form>
            )}

            {step === "code" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  verifyCode()
                }}
              >
                <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                  6-digit code
                </label>
                <input
                  id="code"
                  inputMode="numeric"
                  pattern="\d{6}"
                  maxLength={6}
                  className="w-full tracking-widest text-center text-lg rounded-md border border-gray-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 bg-white px-3 py-2 outline-none"
                  placeholder="••••••"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 w-full rounded-md bg-orange-400 hover:bg-orange-500 disabled:opacity-60 text-white py-2.5 transition"
                >
                  {loading ? "Verifying…" : "Verify Code"}
                </button>

                <div className="mt-4 flex items-center justify-between text-sm">
                  <button
                    type="button"
                    onClick={resend}
                    disabled={cooldown > 0}
                    className="text-orange-700 disabled:text-gray-400 underline"
                    title={cooldown > 0 ? `You can resend in ${cooldown}s` : "Resend code"}
                  >
                    {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep("email")}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Change email
                  </button>
                </div>

                <div className="mt-4 text-center">
                  <a
                    href="/login-password"
                    className="text-sm text-orange-700 hover:text-orange-800 underline"
                  >
                    Use password instead
                  </a>
                </div>
              </form>
            )}
          </div>

          {/* small reassurance note */}
          <p className="text-xs text-gray-500 mt-4 text-center">
            By continuing, you agree to receive a one-time sign-in code to your email.
          </p>
        </div>
      </main>
    </div>
  )
}
