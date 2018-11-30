const express = require('express');
const peerreview = require('../controllers/peerreview.controller.js');

const router = express.Router();

router.get('/', async (req, res) => {
    peerreview.getPeerreviewAll(req, res);
});

module.exports = router;