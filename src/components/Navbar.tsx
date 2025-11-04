import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Determine if we're on any admin route
  const isAdminPage = location.pathname.startsWith("/admin");

  // Auto-close on scroll
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (Math.abs(current - scrollY) > 5) setOpen(false);
      setScrollY(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  // Auto-close on route change
  useEffect(() => setOpen(false), [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)]">
      <div className="flex justify-end">
        <button
          onClick={() => setOpen(!open)}
          className="bg-orange-200/20 backdrop-blur-md p-3 rounded-full border border-orange-200/30 shadow-md hover:bg-orange-200/30 transition-all"
          aria-label="Toggle menu"
        >
          {open ? <X size={26} className="text-white" /> : <Menu size={26} className="text-white" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="mt-4 bg-orange-200/20 backdrop-blur-md border border-orange-200/30 rounded-3xl shadow-lg p-6 flex flex-col items-center gap-4 text-white"
          >
            {!isAdminPage ? (
              <>
                {/* PUBLIC SITE NAV */}
                <Link to="/" className="font-semibold hover:text-pink-200 transition">Home</Link>
                <Link to="/login" className="font-semibold hover:text-pink-200 transition">Login</Link>
                <a href="#venue" className="font-semibold hover:text-pink-200 transition">Venue</a>
              </>
            ) : (
              <>
                {/* ADMIN NAV */}
                <button onClick={handleLogout} className="font-semibold hover:text-pink-200 transition">
                  Log Out / Main Site
                </button>
                <Link to="/admin/dashboard" className="font-semibold hover:text-pink-200 transition">
                  Dashboard
                </Link>
                <Link to="/admin/datahub" className="font-semibold hover:text-pink-200 transition">
                  Data Hub
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
