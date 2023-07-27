const mongoose = require('mongoose');
const Video = require('./models/video');
const Product = require('./models/product');
const Comment = require('./models/comment');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

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

// Dummy data for Video, Product, and Comment collections
const sampleVideos = [
    { videoId: 'vid001', urlImageThumbnail: 'https://images.tokopedia.net/img/cache/900/VqbcmM/2020/11/19/959f09cf-d6fd-413e-ae0e-f92345712666.png' },
    { videoId: 'vid002', urlImageThumbnail: 'https://images.tokopedia.net/img/cache/900/VqbcmM/2023/1/12/7c389e2a-774d-4e4d-b60d-c4946c122195.png' },
    { videoId: 'vid003', urlImageThumbnail: 'https://images.tokopedia.net/img/cache/900/VqbcmM/2022/5/27/cfb2e3cc-eedf-44a7-9907-99692bc97ee9.jpg' },
];

const sampleProducts = [
    {
        videoId: 'vid001',
        productId: 'product1',
        linkProduct: 'tokopedia.com/balamcubes/rubik-3x3-gan-356-rs-3x3-stickerless-original-magnetic-custom',
        title: 'Rubik 3x3 Magnetic Stickerless',
        price: 280999,
    },
    {
        videoId: 'vid001',
        productId: 'product2',
        linkProduct: 'https://www.tokopedia.com/balamcubes/rubik-3x3-gan-356-rs-3x3-stickerless-original-original',
        title: 'Rubik 3x3 Original Stickerless',
        price: 144999,
    },
    {
        videoId: 'vid002',
        productId: 'product3',
        linkProduct: 'https://www.tokopedia.com/balamcubes/rubik-pyraminx-moyu-meilong-stickerless-original',
        title: 'Rubik Pyraminx Stickerless',
        price: 48999,
    },    {
        videoId: 'vid003',
        productId: 'product3',
        linkProduct: 'https://www.tokopedia.com/balamcubes/rubik-3x3-moyu-meilong-3x3-stickerless-original-mirror-silver',
        title: 'Rubik Mirror Silver Stickerless',
        price: 25624,
    }
];

const sampleComments = [
    {
        videoId: 'vid001',
        userName: 'user1',
        comment: 'Rubiknya bagus!',
        createdAt: Date.now(),
        createdBy: 'user1',
        updatedAt: null,
        updatedBy: null,
    },
    {
        videoId: 'vid001',
        userName: 'user2',
        comment: 'Rubiknya mahal banget!',
        createdAt: Date.now(),
        createdBy: 'user2',
        updatedAt: null,
        updatedBy: null,
    },
    {
        videoId: 'vid002',
        userName: 'user3',
        comment: 'Rubiknya ada garansinya ga?',
        createdAt: Date.now(),
        createdBy: 'user3',
        updatedAt: null,
        updatedBy: null,
    },
    {
        videoId: 'vid003',
        userName: 'user2',
        comment: 'Rubiknya unik, harganya murah',
        createdAt: Date.now(),
        createdBy: 'user2',
        updatedAt: null,
        updatedBy: null,
    },
];

// Insert sample data into the Video, Product, and Comment collections
async function insertDummyData() {
    try {
        await Video.insertMany(sampleVideos);
        await Product.insertMany(sampleProducts);
        await Comment.insertMany(sampleComments);
        console.log('Dummy data inserted');
    } catch (error) {
        console.error('Error inserting dummy data:', error);
    }
}

// Connect to MongoDB and insert the dummy data
async function seedDatabase() {
    const mongoStr = process.env.DATABASE_URL;
    try {
        await mongoose.connect(mongoStr);
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
