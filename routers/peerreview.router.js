const express = require('express');
const peerreview = require('../controllers/peerreview.controller.js');
const http = require('http');

const router = express.Router();
const app = express();
const SERVER = app.listen(3000, '/localhost');

router.get('/', async (req, res) => {
    peerreview.getPeerreviewAll(req, res);
});

module.exports = SERVER;