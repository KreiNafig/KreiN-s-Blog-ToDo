import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import usersListRoutes from "./routes/usersList.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));


app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/todo", todoRoutes);
app.use("/api/profile", profileRoutes);
app.use("/users", usersListRoutes);

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT || 4000, () => {
      console.log(`✅ Server running on http://localhost:${process.env.PORT || 4000}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB error:", err));
