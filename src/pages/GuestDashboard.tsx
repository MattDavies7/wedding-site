import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GuestDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:4000/api/auth/verify", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Unauthorized");
        const data = await res.json();
        setUser(data.user);
      })
      .catch(() => navigate("/login"));
  }, [navigate]);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhotos((prev) => [...prev, reader.result as string]);
    reader.readAsDataURL(file);
    setFile(null);
  };

  if (!user) {
    return (
      <div className="text-center mt-10 text-xl">Loading your dashboard...</div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-100 text-gray-800 flex flex-col">
      {/* 1️⃣ Navbar + Welcome */}
      <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-serif">Lester & Matthew</h1>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          Logout
        </button>
      </nav>

      <header className="text-center py-12 bg-orange-50 shadow-inner">
        <h2 className="text-3xl font-bold">Welcome, {user.name || "Guest"}!</h2>
        <p className="text-gray-600 mt-2">
          We’re so happy to have you celebrating with us. Scroll down to RSVP,
          upload memories, and more!
        </p>
      </header>

      {/* 2️⃣ RSVP Form */}
      <section id="rsvp" className="py-16 bg-white text-center">
        <h3 className="text-2xl font-serif mb-6">RSVP</h3>
        <form className="max-w-md mx-auto space-y-4">
          <input
            type="text"
            placeholder="Your full name"
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          <select className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-orange-300">
            <option>Will attend</option>
            <option>Will not attend</option>
          </select>
          {/* future: meal choice dropdown */}
          <button
            type="submit"
            className="bg-orange-400 text-white font-semibold px-6 py-2 rounded-md hover:bg-orange-500 transition"
          >
            Submit RSVP
          </button>
        </form>
      </section>

      {/* 3️⃣ Photo Upload + Gallery */}
      <section id="gallery" className="py-16 bg-orange-50 text-center">
        <h3 className="text-2xl font-serif mb-6">Share Your Photos</h3>
        <form
          onSubmit={handleUpload}
          className="max-w-md mx-auto mb-8 flex flex-col items-center gap-4"
        >
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full border border-gray-300 rounded-md p-2 bg-white"
          />
          <button
            type="submit"
            className="bg-orange-400 text-white px-5 py-2 rounded-md hover:bg-orange-500 transition"
          >
            Upload
          </button>
        </form>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-6">
          {photos.length === 0 && (
            <p className="col-span-full text-gray-600">
              No photos uploaded yet — be the first!
            </p>
          )}
          {photos.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`guest upload ${idx}`}
              className="rounded-lg shadow-md object-cover w-full h-40"
            />
          ))}
        </div>
      </section>

      {/* 4️⃣ Additional FAQs */}
      <section id="faq" className="py-16 bg-white text-center">
        <h3 className="text-2xl font-serif mb-8">Guest FAQs</h3>
        <div className="max-w-2xl mx-auto text-left">
          {[
            {
              q: "When should I arrive?",
              a: "We recommend arriving 30 minutes before the ceremony begins.",
            },
            {
              q: "Where can I park?",
              a: "Parking is available on-site — follow signs for guests.",
            },
            {
              q: "Is there a dress code?",
              a: "Formal attire, but comfortable enough for dancing!",
            },
          ].map((f, i) => (
            <details
              key={i}
              className="border border-orange-200 bg-white/70 mb-4 p-5 rounded-md shadow-sm hover:bg-white/90 transition"
            >
              <summary className="font-semibold cursor-pointer text-gray-900">
                {f.q}
              </summary>
              <p className="mt-3 text-gray-700">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 5️⃣ Footer */}
      <footer className="py-8 bg-orange-100 text-center text-gray-700 border-t border-orange-200">
        <p>Lester & Matthew — © 2026</p>
        <a
          href="#top"
          className="text-blue-600 hover:underline block mt-2 text-sm"
        >
          Back to top
        </a>
      </footer>
    </div>
  );
};

export default GuestDashboard;
