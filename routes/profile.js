const express = require("express");
const router = express.Router();
const authenticateRouter = require("../routes/authorisation");
const User = require("../models/User");
const multer = require("multer");
const upload = multer({ dest: __dirname + '/../public/images/profile/' });

router.get("/", (req, res) => {
  User.findById(req.session.user._id)
    .populate("posts")
    .then(user => {
      res.render("profile", { user: user });
    })
});

router.post("/edit/profileImg", (upload.single("profileImg")), (req, res) => {
  const userId = req.session.user._id;
  User.findByIdAndUpdate(userId, { profileImg: req.file.filename })
    .then(userUpdated => {
      res.redirect("/profile")
    })
    .catch(err => {
      console.log("err", err);
    })
})

module.exports = router;
