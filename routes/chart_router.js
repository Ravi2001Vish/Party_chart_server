const express = require("express");
const router = express.Router();
const Record = require("../model/chart_model")


// ✅ CREATE
router.post("/add", async (req, res) => {
  try {
    const data = new Record(req.body);
    const saved = await data.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ READ ALL
router.get("/", async (req, res) => {
  try {
    const data = await Record.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ READ SINGLE
router.get("/:id", async (req, res) => {
  try {
    const data = await Record.findById(req.params.id);
    if (!data) return res.status(404).json({ message: "Not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await Record.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Record.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;