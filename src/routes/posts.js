const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.post('/', async (req, res) => {
    try {
      const { title, content, sender } = req.body;
      const newPost = new Post({ title, content, sender });
      await newPost.save();
      res.status(201).json(newPost);
    } catch (err) {
      res.status(500).json({ error: 'Failed to add post' });
    }
  });
  
  router.get('/', async (req, res) => {
    try {
      if (req.query.sender) {
        const senderPosts = await Post.find({ sender: req.query.sender });
        return res.json(senderPosts);
      }
      const allPosts = await Post.find();
      res.json(allPosts);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  });
  
  router.get('/:postId', async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId);
      if (!post) return res.status(404).json({ error: 'Post not found' });
      res.json(post);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch post' });
    }
  });
  
  router.put('/:postId', async (req, res) => {
    try {
      const updatedPost = await Post.findByIdAndUpdate(req.params.postId, req.body, { new: true });
      if (!updatedPost) return res.status(404).json({ error: 'Post not found' });
      res.json(updatedPost);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update post' });
    }
  });

module.exports = router;
