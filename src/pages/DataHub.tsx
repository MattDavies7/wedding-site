import NavbarAdmin from "../components/admin/NavbarAdmin";

export default function DataHub() {
  return (
    <div className="min-h-screen bg-white overflow-y-auto">
      <NavbarAdmin />
      <div className="pt-24 px-6 md:px-12 lg:px-20 pb-20">
        <h2 className="text-3xl font-bold text-gray-700 mb-6">Data Hub</h2>
        <p className="text-gray-500 mb-12">
          Visualise guest RSVPs, timeline completion, and photo engagement here.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white shadow-md rounded-2xl p-6 border border-orange-100 h-64 flex items-center justify-center text-gray-400">
            [RSVP Trends Chart Placeholder]
          </div>
          <div className="bg-white shadow-md rounded-2xl p-6 border border-orange-100 h-64 flex items-center justify-center text-gray-400">
            [Guest Attendance Graph Placeholder]
          </div>
        </div>
      </div>
    </div>
  );
}
