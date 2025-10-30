import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import GuestDashboard from "./pages/GuestDashboard";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/guest-dashboard" element={<GuestDashboard />} />
      </Routes>
  );
}

export default App;
