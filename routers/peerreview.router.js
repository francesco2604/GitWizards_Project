const EXPRESS = require('express');
const PEERREVIEW_CONTROLLER = require('../controllers/peerreview.controller.js');

const ROUTER = EXPRESS.Router();

/* Peer Review GET */
ROUTER.get('/', (req, res) => {
    var peerReviews = PEERREVIEW_CONTROLLER.getPeerreviewAll();
    if (peerReviews != null) {
        res.status(200).json(peerReviews);
    }
    else {
        res.status(204).send("There are currently no peer reviews.");
    }
});

module.exports = ROUTER;