const express = require("express");

const router = express.Router();
const Comment = require("../models/comment");

router.post("/", async (req, res) => {
  try {
    const { postId, content, sender } = req.body;
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const newComment = new Comment({ postId, content, sender });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ error: "Failed to add comment" });
  }
});

router.get("/", async (req, res) => {
  try {
    const allComments = await Comment.find();
    res.json(allComments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

router.get("/:postId", async (req, res) => {
  try {
    const postComments = await Comment.find({ postId: req.params.postId });
    res.json(postComments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

router.put("/:commentId", async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      req.body,
      { new: true }
    );
    if (!updatedComment)
      return res.status(404).json({ error: "Comment not found" });
    res.json(updatedComment);
  } catch (err) {
    res.status(500).json({ error: "Failed to update comment" });
  }
});

router.delete("/:commentId", async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(
      req.params.commentId
    );
    if (!deletedComment)
      return res.status(404).json({ error: "Comment not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete comment" });
  }
});

module.exports = router;