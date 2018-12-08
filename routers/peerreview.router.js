const EXPRESS = require('express');
const PEERREVIEW_CONTROLLER = require('../controllers/peerreview.controller.js');

const ROUTER = EXPRESS.Router();

/* Peer Review GET */
ROUTER.get('/', (req, res) => {
    try {
        var peerReviews;
        
        // checks if user is student or teacher
        if (req.get('user_role') == "Teacher") {
            peerReviews = PEERREVIEW_CONTROLLER.getPeerReviewAll();
        }
        else if (req.get('user_role') == "Student") {
            var studentId = req.get('user_id');
            peerReviews = PEERREVIEW_CONTROLLER.getPeerReviewPerStudent(parseInt(studentId));
        }
        else {
            res.status(400).send("User must be of type student or teacher.");
        };

        
        if (peerReviews != null) {
            res.status(200).json(peerReviews);
        }
        else {
            res.status(204).send("There are currently no peer reviews.");
        }
    }
    catch (error) {
        console.log('\tname: ' + error.name
            + ' message: ' + error.message
            + ' at: ' + error.at);
    }
});

module.exports = ROUTER;