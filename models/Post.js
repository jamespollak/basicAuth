const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    //many posts can be tied to one user - one to one relationship
    author: { type: Schema.Types.ObjectId, ref: 'User' },//define relation with additional collection
    title: String,
    content: String,
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;