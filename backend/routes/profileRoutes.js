import express from "express";
import { db } from "../db.js";
import jwt from "jsonwebtoken";
import multer from "multer";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "secret");
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
}

router.get("/:id", async (req, res) => {
  try {
    const user = await db.get(
      "SELECT id, username, email, bio, avatar FROM users WHERE id = ?",
      [req.params.id]
    );

    if (!user) return res.status(404).json({ error: "User not found" });

    const posts = await db.all(
      "SELECT * FROM posts WHERE authorId = ? ORDER BY createdAt DESC",
      [req.params.id]
    );

    res.json({ ...user, posts });
  } catch (err) {
    res.status(500).json({ error: "DB error" });
  }
});

router.put("/me", authMiddleware, upload.single("avatar"), async (req, res) => {
  try {
    const bio = req.body.bio;
    let avatarPath = null;

    if (req.file) {
      avatarPath = `/uploads/${req.file.filename}`;
    }

    await db.run(
      "UPDATE users SET bio = ?, avatar = ? WHERE id = ?",
      [bio, avatarPath, req.userId]
    );

    res.json({ message: "Profile updated!" });
  } catch (err) {
    console.error("Ошибка профиля:", err);
    res.status(500).json({ error: "Cannot update profile" });
  }
});

export default router;
