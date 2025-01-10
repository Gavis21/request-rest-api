const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  postId: mongoose.Schema.Types.ObjectId,
  content: String,
  sender: String,
});

module.exports = mongoose.model("Comment", commentSchema);