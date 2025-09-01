import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getMyPosts, getPostById, createPost, updatePost, deletePost
} from "../controllers/postController.js";

const router = express.Router();

router.use(protect);

router.get("/",      getMyPosts);
router.get("/:id",   getPostById);
router.post("/",     createPost);
router.put("/:id",   updatePost);
router.delete("/:id", deletePost);

export default router;
