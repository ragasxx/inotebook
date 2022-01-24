const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.body);
  res.send("helloo notes");
});

module.exports = router;
