import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rsvpRoutes from "./routes/rsvp";
import authRoutes from "./routes/auth"; // ✅ import the new auth routes

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Base test route
app.get("/", (_req, res) => {
  res.send("Wedding site backend is running :->");
});

// ✅ Use your route files
app.use("/api/rsvp", rsvpRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
