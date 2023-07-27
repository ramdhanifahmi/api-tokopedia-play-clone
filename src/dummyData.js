const mongoose = require('mongoose');
const Video = require('./models/video');
const Product = require('./models/product');
const Comment = require('./models/comment');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

// Clear existing data (optional)
async function clearData() {
    try {
        await Video.deleteMany();
        await Product.deleteMany();
        await Comment.deleteMany();
        console.log('Data cleared.');
    } catch (error) {
        console.error('Error clearing data:', error);
    }
}

// Sample data for Video, Product, and Comment collections
const sampleVideos = [
    { videoId: 'vid001', urlImageThumbnail: 'https://example.com/thumbnail1.jpg' },
    { videoId: 'vid002', urlImageThumbnail: 'https://example.com/thumbnail2.jpg' },
    // Add more sample videos here
];

const sampleProducts = [
    {
        videoId: 'vid001',
        productId: 'product1',
        linkProduct: 'https://www.example.com/product1',
        title: 'Sample Product 1',
        price: 19.99,
    },
    {
        videoId: 'vid001',
        productId: 'product2',
        linkProduct: 'https://www.example.com/product2',
        title: 'Sample Product 2',
        price: 29.99,
    },
    {
        videoId: 'vid002',
        productId: 'product3',
        linkProduct: 'https://www.example.com/product3',
        title: 'Sample Product 3',
        price: 24.99,
    },
    // Add more sample products here
];

const sampleComments = [
    {
        videoId: 'vid001',
        userName: 'user1',
        comment: 'This is a great video!',
        createdAt: Date.now(), // Using Number type for timestamps (timemillis)
        createdBy: 'user1',
        updatedAt: null, // Not updated yet, so set to null
        updatedBy: null,
    },
    {
        videoId: 'vid001',
        userName: 'user2',
        comment: 'Awesome content!',
        createdAt: Date.now(),
        createdBy: 'user2',
        updatedAt: null,
        updatedBy: null,
    },
    {
        videoId: 'vid002',
        userName: 'user3',
        comment: 'Thanks for sharing!',
        createdAt: Date.now(),
        createdBy: 'user3',
        updatedAt: null,
        updatedBy: null,
    },
    // Add more sample comments here
];

// Insert sample data into the Video, Product, and Comment collections
async function insertDummyData() {
    try {
        await Video.insertMany(sampleVideos);
        await Product.insertMany(sampleProducts);
        await Comment.insertMany(sampleComments);
        console.log('Dummy data inserted.');
    } catch (error) {
        console.error('Error inserting dummy data:', error);
    }
}

// Connect to MongoDB and insert the dummy data
async function seedDatabase() {
    const mongoStr = process.env.DATABASE_URL;
    try {
        await mongoose.connect(mongoStr, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
        await clearData(); // Optional: Clear existing data before inserting dummy data
        await insertDummyData();
        mongoose.connection.close();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

seedDatabase();
