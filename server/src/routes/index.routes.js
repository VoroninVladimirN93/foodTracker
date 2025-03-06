const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.routes");
router.get("/api/test", (_, res) => {
  res.send("Hello World");
});

router.use("/auth", authRoutes);

module.exports = router;
