var peerReviewRepo = require('../repositories/peerreview.repository');
var exams = require('../repositories/exam.repositories.js');

var peerReviews = peerReviewRepo.peerReviews;
var exams = peerReviewRepo.exams;

/* GET method for Peer Review */
// gets all peer reviews
var getPeerReviewAll = () => {
    try {
        return peerReviewRepo.getAllPeerReviews;
    } catch (error) {
        console.log('\nname: ' + error.name
            + ' message: ' + error.message
            + ' at: ' + error.at);
    }
};

// gets peer reviews for a student
var getPeerReviewPerStudent = (studentID) => {
    try {
        // looks for all student's exams
        let examsPerStudent = [];
        exams.forEach((exam) => {
            exam.students.forEach((student) => {
                if (student.id === studentID) {
                    examsPerStudent.push(exam);
                } else {
                    console.log("There are no exams for this student.");
                };
            })
        });

        // finds all peer reviews for the exams
        let peerReviewsPerExam = [];
        peerReviews.forEach((review) => {
            examsPerStudent.forEach((exam) => {
                if (review.examid === exam.id) {
                    peerReviewsPerExam.push(review);
                } else {
                    console.log("There are no peer reviews for these exams.");
                };
            })
        });
        let peerReviewGot = peerReviewsPerExam;
        return peerReviewGot;
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
        /*
        newID = peerReviews.length - 1;
        var createdPeerReview = newPeerReview;
        createdPeerReview.id = newID;
        peerReviews.push(createdPeerReview);
        return peerReviews[newID];
        */
        peerReviewRepo.createPeerReview(newPeerReview);
        return peerReviewRepo.getLastPeerReview;
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
        if (peerReviews.length < id) {
            return null;
        } else {
            peerReviewGot = peerReviewRepo.getPeerReviewById(id)
            peerReviewGot = updatedPeerReview;            
        };
        return updatedPeerReview;
    } catch (error) {
        console.log('\nname: ' + error.name
            + ' message: ' + error.message
            + ' at: ' + error.at);
    }
};

module.exports = { getPeerReviewAll, getPeerReviewPerStudent, putPeerReviewByID, postPeerReview };
