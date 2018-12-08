const DATA = require('../repositories/peerreview.repository');

var tasks = DATA.tasks;
var peerReviews = DATA.peerReviews;
var exams = DATA.exams;

/* GET method for Peer Review */
// gets all peer reviews
function getPeerReviewAll() {
    try {
        return peerReviews;
    }
    catch (error) {
        console.log('\tname: ' + error.name
            + ' message: ' + error.message
            + ' at: ' + error.at);
    }
}

// gets peer reviews for a student
function getPeerReviewPerStudent(studentId) {
    try {
        // looks for all student's exams
        var examsPerStudent = [];
        exams.forEach((exam) => {
            exam.students.forEach((student) => {
                if (student.id == studentId) {
                    examsPerStudent.push(exam);
                }
                else {
                    console.log("There are no exams for this student.");
                }
            })
        });

        // finds all peer reviews for the exams
        var peerReviewsPerExam = [];
        peerReviews.forEach((review) => {
            examsPerStudent.forEach((exam) => {
                if (review.examid == exam.id) {
                    peerReviewsPerExam.push(review);
                }
                else {
                    console.log("There are no peer reviews for these exams.");
                }
            })
        });
        var peerReview = peerReviewsPerExam;
        return peerReview;
    }
    catch (error) {
        console.log('\tname: ' + error.name
            + ' message: ' + error.message
            + ' at: ' + error.at);
    }
}

module.exports = { getPeerReviewAll, getPeerReviewPerStudent };
