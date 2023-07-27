const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    videoId: { type: String, required: true },
    urlImageThumbnail: { type: String, required: true },
    createdAt: { type: Number, default: Date.now }, // Using Number type for timestamps (timemillis)
    createdBy: { type: String },
    updatedAt: { type: Number },
    updatedBy: { type: String },
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
