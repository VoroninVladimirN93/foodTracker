const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.routes");
const formatResponse = require("../utils/formatResponse");
router.get("/api/test", (_, res) => {
  res.send("Hello World");
});

router.use("/auth", authRoutes);

router.use("*", (req, res) => {
  res
    .status(404)
    .json(formatResponse(404, "Not found", null, "Resource not found"));
});

module.exports = router;
