const express = require('express');
const router = express.Router();
const Video = require('../models/video');
const Product = require('../models/product');
const Comment = require('../models/comment');
const { formatCurrency, formatTimestamp } = require('../utils/utils');


const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
};

// API Video Thumbnail List
router.get('/videos', async (req, res, next) => {
    const requestedVideoId = req.query.videoId;

    try {
        if (requestedVideoId) {
            const video = await Video.findOne({ videoId: requestedVideoId }, 'videoId urlImageThumbnail embedYoutubeId productName');
            if (!video) {
                return res.status(404).json({ message: 'Video not found' });
            }

            const { _id, videoId, urlImageThumbnail, embedYoutubeId, productName } = video;
            return res.json({ _id, videoId, urlImageThumbnail, embedYoutubeId, productName });
        } else {
            const videos = await Video.find({}, 'videoId urlImageThumbnail embedYoutubeId productName');
            return res.json(videos);
        }
    } catch (err) {
        next(err);
    }
});



// API Product List
router.get('/products', async (req, res, next) => {
    const { videoId, title } = req.query;

    try {
        if (videoId && title) {
            // Both videoId and title are provided, prioritize videoId search (logic same with else if (videoId)
            const products = await Product.find({ videoId }, 'productId linkProduct title price');
            const formattedProducts = products.map((product) => ({
                productId: product.productId,
                linkProduct: product.linkProduct,
                title: product.title,
                price: formatCurrency(product.price),
            }));
            return res.json(formattedProducts);
        } else if (videoId) {
            const products = await Product.find({ videoId }, 'productId linkProduct title price');
            const formattedProducts = products.map((product) => ({
                productId: product.productId,
                linkProduct: product.linkProduct,
                title: product.title,
                price: formatCurrency(product.price), // Use the formatCurrency function to convert to Rupiah format
            }));

            return res.json(formattedProducts);
        } else if (title) {
            const regex = new RegExp(title, 'i'); // 'i' flag for case-insensitive
            const projects = await Product.find({ title: regex }, 'videoId title price');

            if (projects.length === 0) {
                return res.status(200).json([]);
            }

            return res.json(projects);
        } else {
            return res.status(400).json({ error: 'videoId or title is required in query parameters' });
        }
    } catch (err) {
        next(err);
    }
});



// API Comment List
router.get('/comments', async (req, res, next) => {
    const { videoId } = req.query;
    if (!videoId) {
        return res.status(400).json({ error: 'videoId is required in query parameters' });
    }

    try {
        const comments = await Comment.find({ videoId }, 'userName comment createdAt updatedAt');

        const formattedComments = comments.map((comment) => ({
            userName: comment.userName,
            comment: comment.comment,
            timestamp: formatTimestamp(comment.updatedAt || comment.createdAt),
            id: comment._id,
        }));

        res.json(formattedComments);
    } catch (err) {
        next(err);
    }
});

// API Submit Comment
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

// The error handling middleware to the router
router.use(errorHandler);

module.exports = router;
