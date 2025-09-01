import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/todos", todoRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ DB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
