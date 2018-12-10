var peerReviewRepo = require('../repositories/peerreview.repository');
var exams = require('../repositories/exam.repositories.js');

var peerReviews = peerReviewRepo.peerReviews;
var exams = peerReviewRepo.exams;

/* GET method for Peer Review */
// gets all peer reviews
var getPeerReviewAll = () => {
    try {
        return peerReviewRepo.getAllPeerReviews();
    } catch (error) {
        console.log('\nname: ' + error.name
            + ' message: ' + error.message
            + ' at: ' + error.at);
    }
};

// gets peer reviews for a student
var getPeerReviewPerStudent = (studentID) => {
    try {
        let reviewsPerStudent = peerReviewRepo.getPeerReviewsPerStudent(studentID);
        return reviewsPerStudent;
    } catch (error) {
        console.log('\nname: ' + error.name
            + ' message: ' + error.message
            + ' at: ' + error.at);
    }
};

/* POST method for Peer Review */
// creates a new peer review
var postPeerReview = (newPeerReview) => {
    try {
        peerReviewRepo.createPeerReview(newPeerReview);
        return peerReviewRepo.getLastPeerReview();
    } catch (error) {
        console.log('\nname: ' + error.name
            + ' message: ' + error.message
            + ' at: ' + error.at);
    }
};

/* PUT method for Peer Review */
// modifies a peer review
var putPeerReviewByID = (updatedPeerReview, id) => {
    try {
        if (peerReviewRepo.getLength() < id) {
            return null;
        } else {
            let changedPeerReview = peerReviewRepo.setPeerReviewByID(id, updatedPeerReview);
            console.log("LEGGI: " + changedPeerReview);
            return changedPeerReview;
        }
    } catch (error) {
        console.log('\nname: ' + error.name
            + ' message: ' + error.message
            + ' at: ' + error.at);
    }
};

module.exports = { getPeerReviewAll, getPeerReviewPerStudent, postPeerReview, putPeerReviewByID };
