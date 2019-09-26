const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  age: Number,
  mood: String,
  password: { type: String, required: true },
  //user can have many posts - one to many relationship
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  profileImg: String
});

const User = mongoose.model("User", userSchema);

module.exports = User;
