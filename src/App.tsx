import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import GuestDashboard from "./pages/GuestDashboard";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import DataHub from "./pages/DataHub";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/guest-dashboard" element={<GuestDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/datahub" element={<DataHub />} />

      </Routes>
  );
}

export default App;
