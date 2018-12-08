const EXPRESS = require('express');
const PEERREVIEW_CONTROLLER = require('../controllers/peerreview.controller.js');

const ROUTER = EXPRESS.Router();

/* Peer Review GET */
ROUTER.get('/', (req, res) => {
    try {
        let peerReviews;

        // checks if user is student or teacher
        if (parseInt(req.get('user_role')) == 1) {
            peerReviews = PEERREVIEW_CONTROLLER.getPeerReviewAll();
            if (peerReviews != null) {
                res.status(200).json(peerReviews);
            } else {
                res.status(204).send("There are currently no peer reviews.");
            };
        }
        else if (parseInt(req.get('user_role')) == 2) {
            var studentId = req.get('user_id');
            peerReviews = PEERREVIEW_CONTROLLER.getPeerReviewPerStudent(parseInt(studentId));
            if (peerReviews != null) {
                res.status(200).json(peerReviews);
            } else {
                res.status(204).send("There are currently no peer reviews.");
            };
        } else {
            res.status(400).send("User must be of type student or teacher.");
        };
    } catch (error) {
        console.log('\nname: ' + error.name
            + ' message: ' + error.message
            + ' at: ' + error.at);
    }
})

    .put('/:id', (req, res) => {
        try {
            if ((parseInt(req.get('user_role')) == 1) || (parseInt(req.get('user_role')) == 2)) {
                let updatedPeerReview = PEERREVIEW_CONTROLLER.putPeerReviewByID(req.body, parseInt(req.params.id));
                if (updatedPeerReview == null) {
                    res.status(404).send("Not found. \nThere is no peer review for this ID.");
                } else {
                    console.log(updatedPeerReview);
                    res.status(200).json(updatedPeerReview);
                };
            } else {
                res.status(401).send("Unauthorized. \nUser must be a student or a teacher.");
            };
        } catch (error) {
            console.log('\nname: ' + error.name
                + ' message: ' + error.message
                + ' at: ' + error.at);
        }
    });

module.exports = ROUTER;