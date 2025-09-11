import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.listen(4000, () => {
  console.log("✅ Server running on http://localhost:4000");
});
