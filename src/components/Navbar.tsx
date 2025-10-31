import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  // 🧭 Hide the navbar automatically when user scrolls or navigates
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY
      // if user scrolls even slightly or scrolls down from top, close navbar
      if (Math.abs(currentScroll - scrollY) > 5) {
        setOpen(false)
      }
      setScrollY(currentScroll)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrollY])

  // 🧠 Reset nav when a link is clicked
  const handleLinkClick = () => {
    setOpen(false)
  }

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)]">
      <div className="flex justify-end">
        {/* Floating toggle button */}
        <button
          onClick={() => setOpen(!open)}
          className="bg-orange-200/20 backdrop-blur-md p-3 rounded-full border border-orange-200/30 shadow-md hover:bg-orange-200/30 transition-all"
          aria-label="Toggle menu"
        >
          {open ? <X size={26} className="text-white" /> : <Menu size={26} className="text-white" />}
        </button>
      </div>

      {/* Menu dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="mt-4 bg-orange-200/20 backdrop-blur-md border border-orange-200/30 rounded-3xl shadow-lg p-6 flex flex-col items-center gap-4 text-white"
          >
            <Link
              to="/login"
              onClick={handleLinkClick}
              className="font-semibold hover:text-pink-200 transition"
              >
                Login
              </Link>

            <a
              href="#venue"
              onClick={handleLinkClick}
              className="hover:text-pink-200 transition"
            >
              The Venue
            </a>
            {/* Future Nav Links go below */}
            </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
