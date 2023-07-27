const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    videoId: { type: String, required: true },
    userName: { type: String, required: true },
    comment: { type: String, required: true },
    createdAt: { type: Number, default: Date.now },
    createdBy: { type: String },
    updatedAt: { type: Number },
    updatedBy: { type: String },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
