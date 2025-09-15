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

router.get("/", authMiddleware, async (req, res) => {
  try {
    const todos = await db.all(
      "SELECT * FROM todos WHERE userId = ? ORDER BY createdAt DESC",
      [req.userId]
    );
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: "DB error" });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, text } = req.body;

    if (!title || !text) {
      return res.status(400).json({ error: "Title and text are required" });
    }

    const result = await db.run(
      "INSERT INTO todos (title, text, completed, userId) VALUES (?, ?, ?, ?)",
      [title, text, 0, req.userId]
    );

    const newTodo = await db.get("SELECT * FROM todos WHERE id = ?", [
      result.lastID,
    ]);

    res.json(newTodo);
  } catch (err) {
    console.error("Ошибка при создании todo:", err);
    res.status(500).json({ error: "Cannot create todo" });
  }
});


router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, text, completed } = req.body;

    const todo = await db.get(
      "SELECT * FROM todos WHERE id = ? AND userId = ?",
      [req.params.id, req.userId]
    );
    if (!todo) return res.status(404).json({ error: "Todo not found" });

    await db.run(
      "UPDATE todos SET title = ?, text = ?, completed = ? WHERE id = ? AND userId = ?",
      [
        title ?? todo.title,
        text ?? todo.text,
        completed ?? todo.completed,
        req.params.id,
        req.userId,
      ]
    );

    res.json({ message: "Todo updated!" });
  } catch (err) {
    res.status(500).json({ error: "Cannot update todo" });
  }
});


router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const todo = await db.get(
      "SELECT * FROM todos WHERE id = ? AND userId = ?",
      [req.params.id, req.userId]
    );
    if (!todo) return res.status(404).json({ error: "Todo not found" });

    await db.run("DELETE FROM todos WHERE id = ? AND userId = ?", [
      req.params.id,
      req.userId,
    ]);

    res.json({ message: "Todo deleted!" });
  } catch (err) {
    res.status(500).json({ error: "Cannot delete todo" });
  }
});

export default router;
