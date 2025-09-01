import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getMyTodos, createTodo, toggleTodo, updateTodo, deleteTodo
} from "../controllers/todoController.js";

const router = express.Router();

router.use(protect);

router.get("/",        getMyTodos);
router.post("/",       createTodo);
router.patch("/:id",   toggleTodo);
router.put("/:id",     updateTodo);
router.delete("/:id",  deleteTodo);

export default router;
