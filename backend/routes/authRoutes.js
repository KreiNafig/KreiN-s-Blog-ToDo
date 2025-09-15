import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../db.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.run(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    const user = await db.get("SELECT id, username, email FROM users WHERE email = ?", [email]);

    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      "secret",
      { expiresIn: "1h" }
    );

    res.json({ message: "User registered!", token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "User already exists or DB error" });
  }
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);

  if (!user) return res.status(400).json({ error: "User not found" });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(400).json({ error: "Invalid password" });

  const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, "secret", { expiresIn: "1h" });

  res.json({ message: "Login successful", token });
});


function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });

  try {
    const decoded = jwt.verify(token, "secret");
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
}


router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await db.get("SELECT id, username, email FROM users WHERE id = ?", [req.userId]);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});


export default router;
