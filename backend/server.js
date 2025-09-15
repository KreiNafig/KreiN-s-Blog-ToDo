import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import profileRoutes from "./routes/profileRoutes.js"

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("API is working 🚀");
});
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/todo", todoRoutes);
app.use("/api/profile", profileRoutes)


app.listen(4000, () => {
  console.log("✅ Server running on http://localhost:4000");
});
