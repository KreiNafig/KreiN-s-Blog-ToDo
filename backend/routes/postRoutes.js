import express from "express";
import { db } from "../db.js";

const router = express.Router();

// Получить все посты
router.get("/", async (req, res) => {
  const posts = await db.all(
    `SELECT posts.id, posts.title, posts.content, posts.createdAt, users.username as author
     FROM posts
     JOIN users ON posts.authorId = users.id`
  );
  res.json(posts);
});

// Создать пост
router.post("/", async (req, res) => {
  const { title, content, authorId } = req.body;

  await db.run(
    "INSERT INTO posts (title, content, authorId) VALUES (?, ?, ?)",
    [title, content, authorId]
  );

  res.json({ message: "Post created!" });
});

export default router;
