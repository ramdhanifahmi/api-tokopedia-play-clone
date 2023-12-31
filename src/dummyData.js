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
    { videoId: 'vid001', urlImageThumbnail: 'https://images.tokopedia.net/img/cache/900/VqbcmM/2022/3/25/355ec4ff-da61-4d33-b140-f99ebb30c911.png', embedYoutubeId: '198rvXwEGE0', productName: 'Rubik 3x3' },
    { videoId: 'vid002', urlImageThumbnail: 'https://images.tokopedia.net/img/cache/900/VqbcmM/2023/1/12/7c389e2a-774d-4e4d-b60d-c4946c122195.png', embedYoutubeId: 'Slb7fnke2YU', productName: 'Rubik Pyraminx' },
    { videoId: 'vid003', urlImageThumbnail: 'https://images.tokopedia.net/img/cache/900/VqbcmM/2022/5/27/cfb2e3cc-eedf-44a7-9907-99692bc97ee9.jpg', embedYoutubeId: '7xNfsp764ws', productName: 'Rubik Mirror' },
    { videoId: 'vid004', urlImageThumbnail: 'https://images.tokopedia.net/img/cache/900/VqbcmM/2023/1/13/3ca6a3b7-9cad-4f28-b03b-4187c412637c.png', embedYoutubeId: 'ZafrRDNNCR8', productName: 'Rubik 2x2' },
    { videoId: 'vid005', urlImageThumbnail: 'https://images.tokopedia.net/img/cache/900/VqbcmM/2022/7/20/a5cba52b-2fcc-4903-aa74-447ac7f921b2.jpg', embedYoutubeId: 'bXxRqisbMuc', productName: 'Rubik 4x4' },
    { videoId: 'vid006', urlImageThumbnail: 'https://images.tokopedia.net/img/cache/900/VqbcmM/2023/4/5/35cb08f0-d068-473a-b81c-4a19961341cc.jpg', embedYoutubeId: 'ws_xHDz-AvE', productName: 'Rubik Kibiminx' },
    { videoId: 'vid007', urlImageThumbnail: 'https://images.tokopedia.net/img/cache/900/VqbcmM/2022/4/21/65b76940-4674-42e4-a26c-cd87a0941708.png', embedYoutubeId: 'vc1ZQ4w7KCE', productName: 'Rubik Skewb' },
    { videoId: 'vid008', urlImageThumbnail: 'https://images.tokopedia.net/img/cache/900/VqbcmM/2023/1/12/fe7031bb-bd79-4c43-b40e-f6f07a36718e.png', embedYoutubeId: 'Yl5msXDaUUc', productName: 'Rubik Megaminx' },
    { videoId: 'vid009', urlImageThumbnail: 'https://images.tokopedia.net/img/cache/900/VqbcmM/2022/2/15/ca6da231-dcdd-4573-9f5b-73d35cac9b69.jpg', embedYoutubeId: 'yROiD7ffAMA', productName: 'Rubik 5x5' },
    { videoId: 'vid010', urlImageThumbnail: 'https://images.tokopedia.net/img/cache/900/VqbcmM/2021/11/4/5bb2eecd-73c2-442c-8576-ceb0ccc5545d.jpg', embedYoutubeId: 'LbXLhm4vYD8', productName: 'Rubik Braille' },
];

const sampleProducts = [
    {
        videoId: 'vid001',
        linkProduct: 'https://www.tokopedia.com/balamcubes/rubik-3x3-gan-356-rs-3x3-stickerless-original-magnetic-custom',
        title: 'Rubik 3x3 Magnetic Stickerless GAN',
        price: 280999,
    },
    {
        videoId: 'vid001',
        linkProduct: 'https://www.tokopedia.com/balamcubes/rubik-3x3-gan-356-rs-3x3-stickerless-original-original',
        title: 'Rubik 3x3 Original Stickerless GAN',
        price: 144999,
    },
    {
        videoId: 'vid001',
        linkProduct: 'https://www.tokopedia.com/balamcubes/rubik-3x3-moyu-mf-meilong-3x3-macaron-original',
        title: 'Rubik 3x3 Macaron',
        price: 19390,
    },
    {
        videoId: 'vid001',
        linkProduct: 'https://www.tokopedia.com/balamcubes/rubik-3x3-moyu-meilong-m-3m-magnetic-cube-3x3-original',
        title: 'Rubik 3x3 Magnetic Moyu',
        price: 45999,
    },
    {
        videoId: 'vid002',
        linkProduct: 'https://www.tokopedia.com/balamcubes/rubik-pyraminx-moyu-meilong-stickerless-original',
        title: 'Rubik Pyraminx Stickerless',
        price: 28500,
    },
    {
        videoId: 'vid002',
        linkProduct: 'https://www.tokopedia.com/balamcubes/rubik-yongjun-yulong-pyraminx-magnetic-stickerless-original',
        title: 'Rubik Pyraminx Magnetic Stickerless',
        price: 63900,
    },
    {
        videoId: 'vid002',
        linkProduct: 'https://www.tokopedia.com/balamcubes/rubik-pyraminx-moyu-mf-meilong-pyraminx-carbon-original',
        title: 'Rubik Pyraminx Carbon',
        price: 31999,
    },
    {
        videoId: 'vid003',
        linkProduct: 'https://www.tokopedia.com/balamcubes/rubik-3x3-moyu-meilong-3x3-stickerless-original-mirror-silver',
        title: 'Rubik 3x3 Mirror Silver Stickerless',
        price: 28999,
    },
    {
        videoId: 'vid003',
        linkProduct: 'https://www.tokopedia.com/balamcubes/rubik-mirror-moyu-meilong-mirror-3x3-black-gold',
        title: 'Rubik 3x3 Mirror Black Gold',
        price: 28999,
    },
    {
        videoId: 'vid003',
        linkProduct: 'https://www.tokopedia.com/balamcubes/rubik-mirror-3x3-gan-mirror-m-magnetic-speedcube-mirror-3x3-original',
        title: 'Rubik 3x3 Mirror Speed Cube',
        price: 295000,
    },
    {
        videoId: 'vid004',
        linkProduct: 'https://www.tokopedia.com/balamcubes/rubik-2x2-moyu-mf-meilong-2x2-stickerless-original',
        title: 'Rubik 2x2 Stickerless Moyu',
        price: 15299,
    },
    {
        videoId: 'vid004',
        linkProduct: 'https://www.tokopedia.com/balamcubes/rubik-2x2-moyu-meilong-m-2m-magnetic-2x2-stickerless-original',
        title: 'Rubik 2x2 Magnetic Stickerless Moyu',
        price: 50999,
    },
    {
        videoId: 'vid004',
        linkProduct: 'https://www.tokopedia.com/balamcubes/rubik-2x2-gan-251-m-air-magnetic-cube-2x2-stickerless-original',
        title: 'Rubik 2x2 Magnetic Stickerless GAN',
        price: 276900,
    },
    {
        videoId: 'vid004',
        linkProduct: 'https://www.tokopedia.com/balamcubes/rubik-2x2-moyu-mf-meilong-2x2-macaron-original',
        title: 'Rubik 2x2 Macaron Moyu',
        price: 14999,
    },
    {
        videoId: 'vid005',
        linkProduct: 'https://www.tokopedia.com/balamcubes/rubik-4x4-moyu-mf-meilong-4x4-stickerless-original',
        title: 'Rubik 4x4 Stickerless Moyu',
        price: 35500,
    },
    {
        videoId: 'vid005',
        linkProduct: 'https://www.tokopedia.com/balamcubes/rubik-4x4-moyu-meilong-m-4m-magnetic-4x4-stickerless-original',
        title: 'Rubik 4x4 Magnetic Stickerless Moyu',
        price: 93900,
    },
    {
        videoId: 'vid005',
        linkProduct: 'https://www.tokopedia.com/balamcubes/rubik-4x4-gan-460-m-magnetic-cube-4x4',
        title: 'Rubik 4x4 Magnetic Stickerless GAN',
        price: 625000,
    },
    {
        videoId: 'vid006',
        linkProduct: 'https://www.tokopedia.com/balamcubes/rubik-megaminx-2x2-qiyi-kilominx-megaminx-2x2-original-stickerless',
        title: 'Rubik Kibiminx Qiyi',
        price: 50999,
    },
    {
        videoId: 'vid006',
        linkProduct: 'https://www.tokopedia.com/balamcubes/rubik-megaminx-2x2-moyu-meilong-kilominx-kibiminx-stickerless',
        title: 'Rubik Kibiminx Stickerless Moyu',
        price: 79999,
    },
    {
        videoId: 'vid007',
        linkProduct: 'https://www.tokopedia.com/balamcubes/rubik-skewb-gan-skewb-standar-m-stickerless-original',
        title: 'Rubik Skewb Stickerless GAN',
        price: 258888,
    },
    {
        videoId: 'vid007',
        linkProduct: 'https://www.tokopedia.com/balamcubes/rubik-skewb-moyu-rs-skewb-m-magnetic-maglev-2022-original-magnetic',
        title: 'Rubik Skewb Magnetic Moyu',
        price: 99888,
    },
    {
        videoId: 'vid007',
        linkProduct: 'https://www.tokopedia.com/balamcubes/rubik-skewb-moyu-meilong-skewb-sticker-carbon',
        title: 'Rubik Skewb Sticker Carbon Moyu',
        price: 47999,
    },
    {
        videoId: 'vid008',
        linkProduct: 'https://www.tokopedia.com/balamcubes/rubik-megaminx-yong-jun-yj-yuhu-v2-m-megaminx-magnetic-stickerless',
        title: 'Rubik Megaminx Magnetic Stickerless',
        price: 129999,
    },
    {
        videoId: 'vid008',
        linkProduct: 'https://www.tokopedia.com/balamcubes/rubik-megaminx-moyu-meilong-stickerless-original',
        title: 'Rubik Megaminx Stickerless Moyu',
        price: 104999,
    },
    {
        videoId: 'vid008',
        linkProduct: 'https://www.tokopedia.com/balamcubes/rubik-megaminx-gan-megaminx-magnetic-stickerless-original',
        title: 'Rubik Megaminx Magnetic Stickerless GAN',
        price: 602000,
    },
    {
        videoId: 'vid009',
        linkProduct: 'https://www.tokopedia.com/balamcubes/rubik-5x5-moyu-mf-meilong-5x5-stickerless-original-stickerless',
        title: 'Rubik 5x5 Stickerless Moyu MF',
        price: 43999,
    },
    {
        videoId: 'vid009',
        linkProduct: 'https://www.tokopedia.com/balamcubes/rubik-5x5-qiyi-mp-5x5-magnetic-cube',
        title: 'Rubik 5x5 Magnetic Qiyi Mp',
        price: 239000,
    },
    {
        videoId: 'vid009',
        linkProduct: 'https://www.tokopedia.com/balamcubes/rubik-5x5-moyu-mf-meilong-5x5-macaron-original',
        title: 'Rubik 5x5 Macaron Moyu MF',
        price: 43999,
    },
    {
        videoId: 'vid010',
        linkProduct: 'https://www.tokopedia.com/balamcubes/rubik-3x3-yj-blind-cube-rubik-braille',
        title: 'Rubik 3x3 Braille / Blind Cube',
        price: 43999,
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
