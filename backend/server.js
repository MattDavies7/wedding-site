import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import pkg from "pg";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";

console.log("Server Starting........");

dotenv.config();
const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(bodyParser.json());

import authRotes from "./routes/auth.js";

app.use("/api/auth", authRotes);

// Connect to PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // e.g. postgres://user:password@localhost:5432/wedding
});

// Create table if it doesn't exist
(async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS rsvps (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100),
      attending BOOLEAN,
      guests INT,
      dietary_restrictions TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
})();

// POST endpoint to save RSVP data
app.post("/api/rsvp", async (req, res) => {
  try {
    const { name, email, attending, guests, dietary_restrictions } = req.body;
    const result = await pool.query(
      `INSERT INTO rsvps (name, email, attending, guests, dietary_restrictions)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, email, attending, guests, dietary_restrictions]
    );
    res.status(201).json({ message: "RSVP saved", data: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save RSVP" });
  }
});

// GET endpoint to fetch RSVPs
app.get("/api/rsvps", async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM rsvps ORDER BY created_at DESC");
  res.json(rows);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
