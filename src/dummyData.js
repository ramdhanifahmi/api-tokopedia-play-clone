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
    { videoId: 'vid001', urlImageThumbnail: 'https://images.tokopedia.net/img/cache/900/VqbcmM/2022/3/25/355ec4ff-da61-4d33-b140-f99ebb30c911.png', embedYoutubeId: '198rvXwEGE0', productName: 'Rubik 3x3 Magnetic' },
    { videoId: 'vid002', urlImageThumbnail: 'https://images.tokopedia.net/img/cache/900/VqbcmM/2023/1/12/7c389e2a-774d-4e4d-b60d-c4946c122195.png', embedYoutubeId: 'Slb7fnke2YU', productName: 'Rubik Pyraminx' },
    { videoId: 'vid003', urlImageThumbnail: 'https://images.tokopedia.net/img/cache/900/VqbcmM/2022/5/27/cfb2e3cc-eedf-44a7-9907-99692bc97ee9.jpg', embedYoutubeId: '7xNfsp764ws', productName: 'Rubik 3x3 Mirror' },
    { videoId: 'vid004', urlImageThumbnail: 'https://images.tokopedia.net/img/cache/900/VqbcmM/2023/1/13/3ca6a3b7-9cad-4f28-b03b-4187c412637c.png', embedYoutubeId: 'ZafrRDNNCR8', productName: 'Rubik 2x2 Stickerless' },
    { videoId: 'vid005', urlImageThumbnail: 'https://images.tokopedia.net/img/cache/900/VqbcmM/2022/7/20/a5cba52b-2fcc-4903-aa74-447ac7f921b2.jpg', embedYoutubeId: 'bXxRqisbMuc', productName: 'Rubik 4x4 Stickerless' },
    { videoId: 'vid006', urlImageThumbnail: 'https://images.tokopedia.net/img/cache/900/VqbcmM/2023/4/5/35cb08f0-d068-473a-b81c-4a19961341cc.jpg', embedYoutubeId: 'ws_xHDz-AvE', productName: 'Rubik Kibiminx' },
    { videoId: 'vid007', urlImageThumbnail: 'https://images.tokopedia.net/img/cache/900/VqbcmM/2022/4/21/65b76940-4674-42e4-a26c-cd87a0941708.png', embedYoutubeId: 'vc1ZQ4w7KCE', productName: 'Rubik Skewb' },
    { videoId: 'vid008', urlImageThumbnail: 'https://images.tokopedia.net/img/cache/900/VqbcmM/2023/1/12/fe7031bb-bd79-4c43-b40e-f6f07a36718e.png', embedYoutubeId: 'Yl5msXDaUUc', productName: 'Rubik Megaminx' },
    { videoId: 'vid009', urlImageThumbnail: 'https://images.tokopedia.net/img/cache/900/VqbcmM/2022/2/15/ca6da231-dcdd-4573-9f5b-73d35cac9b69.jpg', embedYoutubeId: 'yROiD7ffAMA', productName: 'Rubik 5x5 Stickerless' },
    { videoId: 'vid010', urlImageThumbnail: 'https://images.tokopedia.net/img/cache/900/VqbcmM/2021/11/4/5bb2eecd-73c2-442c-8576-ceb0ccc5545d.jpg', embedYoutubeId: 'LbXLhm4vYD8', productName: 'Rubik Braille' },
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
