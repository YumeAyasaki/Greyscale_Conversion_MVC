const express = require('express');

const upload = require('../middleware/multer');
const MongoDBDatabase = require('../models/mongoDBDatabase');
const ImageController = require('../controllers/imageController');
require('dotenv').config();

const database = new MongoDBDatabase(process.env.DATABASE_URL);
const imageController = new ImageController(database);

const router = express.Router();

router.post('/upload', upload.single('file'), async (req, res) => {
    imageController.upload(req, res);
});

router.get('/greyscale/:id', async (req, res) => {
    imageController.greyscale(req, res);
});

router.get('/:id', async (req, res) => {
    imageController.retrieve(req, res);
});

module.exports = router;