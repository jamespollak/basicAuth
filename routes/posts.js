var express = require("express");
var router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");

router.post("/", (req, res) => {
    const { title, content } = req.body;
    const userId = req.session.user._id;
    Post.create({
        title,
        content,
        author: userId
    })
        .then(post => {
            return User.findByIdAndUpdate(userId,
                { $push: { posts: post._id } },
                { new: true })
        })
        .then(updatedUser => {
            res.redirect("/profile")
        })
        .catch(err => {
            console.log("err", err);
        });
})

//create get request to get all posts

router.get("/", (req, res) => {
    debugger;
    Post.find()
        .populate("author")
        .then(posts => {
            res.render("postList", { posts: posts });
        })
        .catch(err => {
            console.log(err);
        });
});
//populate the author of post
//show post and name of author in hbs

module.exports = router;