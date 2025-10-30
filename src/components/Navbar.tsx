import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function Navbar() {
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY
      if (currentScroll < 100) {
        setVisible(true)
      } else if (currentScroll > lastScrollY) {
        setVisible(false)
      } else {
        setVisible(true)
      }
      setLastScrollY(currentScroll)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <nav
      className={`fixed z-50 transition-all duration-500 w-[calc(100%-2rem)] left-1/2 -translate-x-1/2 ${
        visible ? "top-6 opacity-100" : "top-0 opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-orange-200/70 backdrop-blur-lg shadow-md px-10 py-3 rounded-full flex items-center justify-between border border-orange-300/50">
        {/* Left side — Login */}
        <Link
          to="/login"
          className="text-gray-800 font-semibold hover:text-pink-600 transition-colors"
        >
          Login
        </Link>

        {/* Right side — Nav links */}
        <div className="flex gap-8">
          <a
            href="#venue"
            className="text-gray-700 hover:text-pink-600 transition-colors"
          >
            The Venue
          </a>

          {/* Future links here */}
        </div>
      </div>
    </nav>
  )
}
