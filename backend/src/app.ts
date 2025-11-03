import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rsvpRoutes from "./routes/rsvp"; // ✅ no .js extension in CommonJS mode

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Wedding site backend is running :->");
});

app.use("/api/rsvp", rsvpRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
