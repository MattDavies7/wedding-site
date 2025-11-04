import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("✅ Account created! You can now sign in.");
        setForm({ email: "", firstName: "", lastName: "", password: "" });
      } else {
        setMessage(data.message || "Something went wrong.");
      }
    } catch {
      setMessage("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-orange-50">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-2xl shadow-md p-8 border border-orange-200/50">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Create Account</h1>
          <p className="text-sm text-gray-600 mb-6">
            Set up your login details below.
          </p>

          <form onSubmit={register}>
            {["firstName", "lastName", "email", "password"].map((field) => (
              <div key={field} className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700 mb-1 capitalize"
                  htmlFor={field}
                >
                  {field === "firstName"
                    ? "First Name"
                    : field === "lastName"
                    ? "Last Name"
                    : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  id={field}
                  type={
                    field === "password"
                      ? "password"
                      : field === "email"
                      ? "email"
                      : "text"
                  }
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition"
                  placeholder={
                    field === "firstName"
                      ? "e.g. Sarah"
                      : field === "lastName"
                      ? "e.g. Davies"
                      : field === "email"
                      ? "you@example.com"
                      : "Enter password"
                  }
                  value={form[field as keyof typeof form]}
                  onChange={(e) =>
                    setForm({ ...form, [field]: e.target.value })
                  }
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-400 hover:bg-orange-500 text-white rounded-md py-2.5 transition disabled:opacity-60 shadow-sm"
            >
              {loading ? "Creating…" : "Create Account"}
            </button>

            <p className="text-sm mt-4 text-center text-gray-700">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-orange-700 hover:text-orange-800 underline transition"
              >
                Log in
              </a>
            </p>

            {message && (
              <p
                className={`mt-4 text-center text-sm ${
                  message.includes("✅") ? "text-green-700" : "text-red-700"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}
