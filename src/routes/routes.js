const express = require('express');
const router = express.Router();
const Video = require('../models/video');
const Product = require('../models/product');
const Comment = require('../models/comment');

// Video Thumbnail List - Method: GET
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
};

router.get('/videos', async (req, res, next) => {
    try {
        const videos = await Video.find({}, 'videoId urlImageThumbnail');
        res.json(videos);
    } catch (err) {
        next(err);
    }
});

router.get('/products', async (req, res, next) => {
    const { videoId } = req.query;
    if (!videoId) {
        return res.status(400).json({ error: 'videoId is required in query parameters' });
    }

    try {
        const products = await Product.find({ videoId }, 'productId linkProduct title price');
        res.json(products);
    } catch (err) {
        next(err);
    }
});

const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${hours}:${minutes} ${day}-${month}-${year}`;
};

router.get('/comments', async (req, res, next) => {
    const { videoId } = req.query;
    if (!videoId) {
        return res.status(400).json({ error: 'videoId is required in query parameters' });
    }

    try {
        const comments = await Comment.find({ videoId }, 'userName comment createdAt updatedAt');

        // Map the comments array to modify the timestamp field based on updatedAt or createdAt
        const formattedComments = comments.map((comment) => ({
            userName: comment.userName,
            comment: comment.comment,
            timestamp: formatTimestamp(comment.updatedAt || comment.createdAt),
        }));

        res.json(formattedComments);
    } catch (err) {
        next(err);
    }
});


router.post('/comments', async (req, res, next) => {
    const { videoId, userName, comment } = req.body;
    if (!videoId || !userName || !comment) {
        return res.status(400).json({ error: 'videoId, userName, and comment are required in the request body' });
    }

    try {
        const newComment = new Comment({ videoId, userName, comment });
        await newComment.save();
        res.json({ success: true });
    } catch (err) {
        next(err);
    }
});

// Add the error handling middleware to the router
router.use(errorHandler);

module.exports = router;
