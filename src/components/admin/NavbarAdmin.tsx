import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function NavbarAdmin() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-orange-200/90 backdrop-blur-sm z-50 shadow-md">
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="text-xl font-bold text-gray-800">💍 Admin Panel</h1>

        <button
          onClick={() => setOpen(!open)}
          className="text-gray-800 focus:outline-none"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {open && (
        <div className="flex flex-col items-center gap-4 py-4 bg-orange-100 border-t border-orange-300">
          <Link
            to="/admin/dashboard"
            onClick={() => setOpen(false)}
            className="font-semibold hover:text-orange-700 transition"
          >
            Dashboard
          </Link>
          <Link
            to="/admin/datahub"
            onClick={() => setOpen(false)}
            className="font-semibold hover:text-orange-700 transition"
          >
            Data Hub
          </Link>
          <button
            onClick={() => alert('Logging out...')}
            className="text-red-600 font-medium"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
