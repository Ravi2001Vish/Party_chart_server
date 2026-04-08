const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const recordRoutes = require("./routes/chart_router")
const app = express();

// ⚡ Faster middlewares
app.use(cors());
app.use(express.json({ limit: "10kb" }));

// 🔗 MongoDB Connection (optimized)
mongoose.connect("mongodb://ravi2000vish_db_user:fXYv_CSpu6MJn_f@ac-br1uo2h-shard-00-00.sqbbe3b.mongodb.net:27017,ac-br1uo2h-shard-00-01.sqbbe3b.mongodb.net:27017,ac-br1uo2h-shard-00-02.sqbbe3b.mongodb.net:27017/?ssl=true&replicaSet=atlas-13wv3k-shard-0&authSource=admin&appName=Cluster0", {
  maxPoolSize: 10, // ⚡ connection pool
})
.then(() => console.log("✅ MongoDB connected successfully"))
.catch(err => console.log("❌ MongoDB error:", err));


app.get("/", (req, res) => {
  res.send("Hello World 🚀");
});

// 🚀 Start Server
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});

app.use("/api", recordRoutes);