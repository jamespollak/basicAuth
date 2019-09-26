const express = require("express");
const router = express.Router();

//Our custom middleware function.
router.use("/", (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.send("You are not logged in");
  }
});

module.exports = router;
