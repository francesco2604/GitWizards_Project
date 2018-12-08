const DATA = require('../repositories/peerreview.repository');

var peerReviews = DATA.peerReviews;
var exams = DATA.exams;

/* GET method for Peer Review */
// gets all peer reviews
var getPeerReviewAll = () => {
    try {
        return peerReviews;
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

/* PUT method for Peer Review */
// puts a new peer review
var putPeerReviewByID = (newPeerReview, id) => {
    try {
        if (peerReviews.length < id) {
            return null;
        } else {
            let index = peerReviews.findIndex((item) => {
                if (item.id === id) {
                    return item;
                }
            });
        };
        peerReviews[0] = newPeerReview;
        return newPeerReview;
    } catch (error) {
        console.log('\nname: ' + error.name
            + ' message: ' + error.message
            + ' at: ' + error.at);
    }
};

module.exports = { getPeerReviewAll, getPeerReviewPerStudent, putPeerReviewByID };
