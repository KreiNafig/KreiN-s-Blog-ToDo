import express from "express";
import { db } from "../db.js";

const router = express.Router();

router.get("/random", async (req, res) => {
  try {
    const users = await db.all(
      `SELECT id, username, bio, avatar 
       FROM users 
       ORDER BY RANDOM() 
       LIMIT 5`
    );

    const mappedUsers = users.map((u) => ({
      id: u.id,
      username: u.username,
      bio: u.bio,
      avatar:
        u.avatar ||
        "https://i.pinimg.com/736x/8b/26/40/8b264036d4817515a2d60043f3ae9643.jpg",
    }));

    res.json(mappedUsers);
  } catch (err) {
    console.error("Ошибка получения случайных пользователей:", err);
    res.status(500).json({ error: "DB error" });
  }
});

export default router;
