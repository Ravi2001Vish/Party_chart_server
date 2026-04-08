const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  route: { type: String, required: true },
  party: { type: String, required: true },
  sealedChalan: { type: Number, default: 0 },
  gps: { type: Number, default: 0 },
  low: { type: Number, default: 0 },
  good: { type: Number, default: 0 },
  high: { type: Number, default: 0 },
  medium: { type: Number, default: 0 },
  status: { type: String, default: "PENDING" },
}, {
  timestamps: true // ✅ auto adds createdAt & updatedAt
});

module.exports = mongoose.model("Record", recordSchema);