const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const productSchema = new mongoose.Schema({
    videoId: { type: String, required: true },
    productId: { type: String, default: uuidv4, required: true },
    linkProduct: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    createdAt: { type: Number, default: Date.now },
    createdBy: { type: String },
    updatedAt: { type: Number },
    updatedBy: { type: String },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

