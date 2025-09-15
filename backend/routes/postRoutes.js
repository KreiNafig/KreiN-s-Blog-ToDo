import express from "express";
import { db } from "../db.js";
import jwt from "jsonwebtoken";

const router = express.Router();

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

router.get("/", async (req, res) => {
  try {
    const posts = await db.all(
      `SELECT posts.id, posts.title, posts.content, posts.createdAt,
              users.username as author,
              COUNT(comments.id) as commentsCount
       FROM posts
       JOIN users ON posts.authorId = users.id
       LEFT JOIN comments ON comments.postId = posts.id
       GROUP BY posts.id
       ORDER BY posts.createdAt DESC`
    );
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "DB error" });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;

    await db.run(
      "INSERT INTO posts (title, content, authorId) VALUES (?, ?, ?)",
      [title, content, req.userId]
    );

    res.json({ message: "Post created!" });
  } catch (err) {
    res.status(500).json({ error: "Cannot create post" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await db.get(
      `SELECT posts.id, posts.title, posts.content, posts.createdAt,
              users.username as author, posts.authorId
       FROM posts
       JOIN users ON posts.authorId = users.id
       WHERE posts.id = ?`,
      [req.params.id]
    );

    if (!post) return res.status(404).json({ error: "Post not found" });

    const comments = await db.all(
      `SELECT comments.id, comments.text, comments.createdAt, comments.userId,
              users.username as author
       FROM comments
       JOIN users ON comments.userId = users.id
       WHERE comments.postId = ?
       ORDER BY comments.createdAt ASC`,
      [req.params.id]
    );

    res.json({ ...post, comments });
  } catch (err) {
    res.status(500).json({ error: "DB error" });
  }
});

router.post("/:id/comments", authMiddleware, async (req, res) => {
  try {
    const { text } = req.body;

    await db.run(
      "INSERT INTO comments (postId, userId, text) VALUES (?, ?, ?)",
      [req.params.id, req.userId, text]
    );

    res.json({ message: "Comment added!" });
  } catch (err) {
    res.status(500).json({ error: "Cannot add comment" });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  const post = await db.get("SELECT * FROM posts WHERE id = ?", [id]);
  if (!post) return res.status(404).json({ error: "Post not found" });

  if (post.authorId !== req.userId) {
    return res.status(403).json({ error: "You can delete only your posts" });
  }

  await db.run("DELETE FROM posts WHERE id = ?", [id]);
  res.json({ message: "Post deleted" });
});

router.put("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const post = await db.get("SELECT * FROM posts WHERE id = ?", [id]);
  if (!post) return res.status(404).json({ error: "Post not found" });

  if (post.authorId !== req.userId) {
    return res.status(403).json({ error: "You can update only your posts" });
  }

  await db.run("UPDATE posts SET title = ?, content = ? WHERE id = ?", [
    title,
    content,
    id,
  ]);

  res.json({ message: "Post updated" });
});

router.delete("/:postId/comments/:commentId", authMiddleware, async (req, res) => {
  const { commentId } = req.params;

  const comment = await db.get("SELECT * FROM comments WHERE id = ?", [commentId]);
  if (!comment) return res.status(404).json({ error: "Comment not found" });

  if (comment.userId !== req.userId) {
    return res.status(403).json({ error: "You can delete only your comments" });
  }

  await db.run("DELETE FROM comments WHERE id = ?", [commentId]);
  res.json({ message: "Comment deleted" });
});

router.put("/:postId/comments/:commentId", authMiddleware, async (req, res) => {
  const { commentId } = req.params;
  const { text } = req.body;

  const comment = await db.get("SELECT * FROM comments WHERE id = ?", [commentId]);
  if (!comment) return res.status(404).json({ error: "Comment not found" });

  if (comment.userId !== req.userId) {
    return res.status(403).json({ error: "You can update only your comments" });
  }

  await db.run("UPDATE comments SET text = ? WHERE id = ?", [text, commentId]);

  res.json({ message: "Comment updated" });
});

export default router;
