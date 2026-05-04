const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// ✅ ROOT ROUTE (FIX FOR "Cannot GET /")
app.get("/", (req, res) => {
  res.send("API is running...");
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});