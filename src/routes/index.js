const express = require('express');

const postRoutes = require('./posts');
const commentRoutes = require('./comments');

const router = express.Router();

router.use('/post', postRoutes);

module.exports = router;
