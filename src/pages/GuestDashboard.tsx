import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GuestDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // check for token in localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    // (optional) fetch user details from backend
    fetch("http://localhost:4000/api/auth/verify", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Unauthorized");
        const data = await res.json();
        setUser(data.user);
      })
      .catch(() => navigate("/login"));
  }, [navigate]);

  if (!user) {
    return <div className="text-center mt-10 text-xl">Loading your dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Welcome, {user.name || "Guest"}!
      </h1>
      <p className="text-gray-600 mb-8">
        Thank you for joining our special day. You can RSVP, select your meal, and see updates here.
      </p>

      <div className="space-y-4">
        <button
          onClick={() => navigate("/rsvp")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
        >
          RSVP Now
        </button>

        <button
          onClick={() => navigate("/faq")}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg shadow hover:bg-gray-300"
        >
          View FAQs
        </button>
      </div>
    </div>
  );
};

export default GuestDashboard;
