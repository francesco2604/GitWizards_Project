const express = require('express');
const PEERREVIEW = require('../controllers/peerreview.controller.js');

const ROUTER = express.Router();

/* Peer Review GET */
ROUTER.get('/', PEERREVIEW.getPeerreviewAll);

module.exports = ROUTER;