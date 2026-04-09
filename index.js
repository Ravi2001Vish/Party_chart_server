const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const recordRoutes = require("./routes/chart_router");
const authRoutes = require("./routes/auth_routes"); // 👈 NEW

const app = express();

// ⚡ Middlewares
app.use(cors({
  origin: ["http://localhost:3000", "https://your-frontend.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json({ limit: "10kb" }));

// 🔗 MongoDB Connection
mongoose.connect("mongodb://ravi2000vish_db_user:fXYv_CSpu6MJn_f@ac-br1uo2h-shard-00-00.sqbbe3b.mongodb.net:27017,ac-br1uo2h-shard-00-01.sqbbe3b.mongodb.net:27017,ac-br1uo2h-shard-00-02.sqbbe3b.mongodb.net:27017/?ssl=true&replicaSet=atlas-13wv3k-shard-0&authSource=admin&appName=Cluster0", {
  maxPoolSize: 10,
})
.then(() => console.log("✅ MongoDB connected successfully"))
.catch(err => console.log("❌ MongoDB error:", err));

// 🏠 Test Route
app.get("/", (req, res) => {
  res.send("Hello World 🚀");
});

// 🔐 LOGIN ROUTES
   // 👈 IMPORTANT

// 🔐 USER FILTER MIDDLEWARE
const users = [
  {
    username: "maihar",
    allowedParties: ["MAIHAR ULTRATEC CEMENT WORKS"],
  },
  {
    username: "bela",
    allowedParties: ["BELA ULTRATEC CEMENT WORKS"],
  },
  {
    username: "dhar",
    allowedParties: ["DHAR ULTRATEC CEMENT WORKS"],
  },
  {
    username: "jklakshmi",
    allowedParties: ["JK LAKSHMI CEMENT LTD"],
  },
  {
    username: "admin@si.com",
    allowedParties: [
      "MAIHAR ULTRATEC CEMENT WORKS",
      "BELA ULTRATEC CEMENT WORKS",
      "DHAR ULTRATEC CEMENT WORKS",
      "JK LAKSHMI CEMENT LTD",
    ],
  },
];

app.use("/api", (req, res, next) => {
  const username = req.query.username;

  if (!username) return next();

  const user = users.find((u) => u.username === username);

  if (!user) return next();

  req.allowedParties = user.allowedParties;

  next();
});
// Direct test route (bypass authRoutes)
app.post("/api/login-direct", (req, res) => {
  console.log("Direct test route hit!");
  res.json({ message: "Direct route works!" });
});
// 🚀 MAIN ROUTES
app.use("/api", recordRoutes);
app.use("/api", authRoutes);
//app.use(authRoutes)

// 🚀 Start Server (FIXED FOR RENDER)
const PORT = process.env.PORT || 5000;  
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});