import Navbar from "../components/Navbar";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />

      <main className="pt-24 px-6 lg:px-20 pb-24 space-y-20">
        {/* --- TOP SECTION --- */}
        <section className="grid lg:grid-cols-[320px_1fr] gap-10 items-start">
          {/* Countdown sidebar */}
          <div className="bg-orange-300 text-white p-10 rounded-2xl flex flex-col justify-between items-center h-full shadow-md min-h-[480px]">
            <h3 className="text-2xl font-bold tracking-wide mb-4">Countdown</h3>
            <div className="flex-1 w-full flex flex-col justify-evenly items-center text-lg">
              <p className="font-medium">1 Year</p>
              <p className="font-medium">3 Months</p>
              <p className="font-medium">12 Days</p>
              <p className="font-medium">5 Hours</p>
            </div>
          </div>

          {/* Quote + Story */}
          <div className="flex flex-col gap-8">
            {/* Romantic Quote */}
            <div className="bg-white shadow-sm rounded-2xl p-10 border border-orange-100 text-center">
              <h2 className="text-3xl font-serif italic text-gray-700 mb-3">
                “Together is a beautiful place to be.”
              </h2>
              <p className="text-sm text-gray-400">— Add your own quote here</p>
            </div>

            {/* Story Form */}
            <div className="bg-white shadow-sm rounded-2xl p-8 border border-orange-100">
              <h3 className="text-lg font-semibold mb-3">Add Story / Update</h3>
              <textarea
                placeholder="Share a funny or sweet moment to appear on the guest feed..."
                className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
              <div className="text-right mt-4">
                <button className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2.5 rounded-lg transition">
                  Post Update
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* --- MIDDLE SECTION --- */}
        <section className="grid lg:grid-cols-2 gap-10">
          {/* Left side: RSVP + Timeline */}
          <div className="space-y-10">
            <div className="bg-white shadow-sm rounded-2xl p-8 border border-orange-100 h-[320px] flex flex-col">
              <h3 className="text-lg font-semibold mb-4">RSVP Overview</h3>
              <div className="flex-1 flex items-center justify-center text-gray-400">
                [Pie Chart Placeholder]
              </div>
            </div>

            <div className="bg-white shadow-sm rounded-2xl p-8 border border-orange-100 h-[320px] flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-4">Wedding Day Timeline</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>2:00 PM — Ceremony begins</li>
                  <li>3:00 PM — Photos & Drinks</li>
                  <li>5:00 PM — Dinner & Toasts</li>
                </ul>
              </div>
              <button className="mt-5 bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-lg transition self-start">
                Edit Timeline
              </button>
            </div>
          </div>

          {/* Right side: Upload + Email */}
          <div className="space-y-10">
            <div className="bg-white shadow-sm rounded-2xl p-8 border border-orange-100 h-[320px] flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-4">Upload Photos</h3>
                <input type="file" multiple className="mb-4" />
              </div>
              <div className="text-right">
                <button className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-lg transition">
                  Upload
                </button>
              </div>
            </div>

            <div className="bg-white shadow-sm rounded-2xl p-8 border border-orange-100 h-[320px] flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-4">Email Guests</h3>
                <textarea
                  placeholder="Type your message here..."
                  className="w-full h-28 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button className="bg-gray-200 text-gray-800 px-3 py-1 rounded-lg">
                  Email Selected
                </button>
                <button className="bg-orange-400 hover:bg-orange-500 text-white px-3 py-1 rounded-lg">
                  Email All
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* --- BOTTOM SECTION --- */}
        <section className="grid lg:grid-cols-3 gap-10">
          <div className="col-span-3 bg-white shadow-md rounded-2xl p-8 border border-orange-100 text-center">
            <h3 className="text-lg font-semibold mb-2">Couple Timeline</h3>
            <p className="text-gray-500">
              Upcoming milestones like “Buy suits” or “Pay venue”.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-8 border border-orange-100">
            <h3 className="text-lg font-semibold mb-4">To-Do List</h3>
            <ul className="space-y-2 text-gray-600">
              <li>✔️ Choose flowers</li>
              <li>⬜ Finalise menu</li>
              <li>⬜ Send invites</li>
            </ul>
            <button className="mt-4 bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-lg transition">
              Add Task
            </button>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-8 border border-orange-100 lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Vendor Contacts</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Venue – 0191 123 4567</li>
              <li>Photographer – 0777 999 8888</li>
              <li>Planner – 0123 456 789</li>
            </ul>
            <button className="mt-4 bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-lg transition">
              Add Contact
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
