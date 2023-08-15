// index.js
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mongoStr = process.env.DATABASE_URL;
const cors = require('cors');
const moment = require('moment-timezone');



mongoose.connect(mongoStr);

mongoose.connection.on('error', (error) => {
    console.error('MongoDB Connection Error:', error);
});

mongoose.connection.once('open', () => {
    console.log('Database Connected');
});

const routes = require('./routes/routes.js');
const app = express();
app.use(cors({
    origin: '*',
    // allowHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', routes);

const port = process.env.PORT || 3000;

// Set the server's timezone to 'Asia/Jakarta'
moment.tz.setDefault('Asia/Jakarta');
app.listen(port, () => {
    console.log(`Express Server is running on port ${port}`);
});
