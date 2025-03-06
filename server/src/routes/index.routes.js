const express = require("express");
const router = express.Router();

router.get("/api/test", (_, res) => {
  res.send("Hello World");
});

module.exports = router;
