const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const recordRoutes = require("./routes/chart_router");

const app = express();

// 🔐 USERS (Role-based access)
const users = [
  {
    username: "ultratec",
    password: "123456",
    allowedParties: [
      "MAIHAR ULTRATEC CEMENT WORKS",
      "BELA ULTRATEC CEMENT WORKS",
      "DHAR ULTRATEC CEMENT WORKS",
    ],
  },
  {
    username: "jklakshmi",
    password: "11223344",
    allowedParties: [
      "JK LAKSHMI CEMENT LTD",
    ],
  },
];

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


// 🔐 LOGIN API
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({
    message: "Login successful",
    user: {
      username: user.username,
      allowedParties: user.allowedParties,
    },
  });
});


// 🔐 MIDDLEWARE (Filter by user)
app.use("/api", (req, res, next) => {
  const username = req.query.username;

  if (!username) return next();

  const user = users.find((u) => u.username === username);

  if (!user) return next();

  // Attach allowed parties to request
  req.allowedParties = user.allowedParties;

  next();
});

// 🚀 ROUTES (your existing)
app.use("/api", recordRoutes);


// 🚀 Start Server
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});