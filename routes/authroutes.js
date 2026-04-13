const express = require("express");
const router = express.Router();

// 🔐 USERS (same data)
const users = [
  {
    username: "maihar",
    password: "123456",
    allowedParties: ["MAIHAR ULTRATEC CEMENT WORKS"],
  },
  {
    username: "bela",
    password: "20261",
    allowedParties: ["BELA ULTRATEC CEMENT WORKS"],
  },
  {
    username: "dhar",
    password: "999999",
    allowedParties: ["DHAR ULTRATEC CEMENT WORKS"],
  },
  {
    username: "jklakshmi",
    password: "112233",
    allowedParties: ["JK LAKSHMI CEMENT LTD"],
  },

   {
    username: "jkdabok",
    password: "223344",
    allowedParties: ["JK LAKSHMI CEMENT DABOK"],
  },
  {
    username: "admin@si.com",
    password: "sypl@2026",
    allowedParties: [
      "MAIHAR ULTRATEC CEMENT WORKS",
      "BELA ULTRATEC CEMENT WORKS",
      "DHAR ULTRATEC CEMENT WORKS",
      "JK LAKSHMI CEMENT LTD",
    ],
  },
];

// 🔐 LOGIN ROUTE
router.post("/login", (req, res) => {
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

module.exports = router;