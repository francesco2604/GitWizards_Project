/* Example variables */
var UserRep = require('../repositories/user.repository.js');
var TaskRer = require('../repositories/task.repository.js');
var Exam = require('../repositories/exam.repositories.js');

var PeerReview = require('../models/peerreview.model');

const tasks = [TaskRer.getTaskById(1), TaskRer.getTaskById(2)];

//const exams=[Exam.getExamForId(1), Exam.getExamForId(2)];

//var peerReviews = [peerReview];

class PeerReviewRepository {

    constructor() {
        this._peerReviews = new Map([
            [1, new PeerReview(0, 1, tasks[0], 3, 30, 'Example n. 1', '12.21.18')],
            [2, new PeerReview(1, 2, tasks[0], 2, 20, 'Example n. 2', '02.01.19')],
            [3, new PeerReview(2, 3, tasks[1], 2, 24, 'Example n. 3', '03.01.19')]
        ]);
    }

    createPeerReview(review) {
        var newID = this._peerReviews.size;
        review.id = newID;
        this._peerReviews.set(newID, review);
        return newID;
    }

    getAllPeerReviews() {
        return this._peerReviews;
    }
    
    getPeerReviewByID(peerReviewID) {
        return this._peerReviews.get(peerReviewID);
    }

    getLastPeerReview(){
      return this._peerReviews.get(_peerReviews.size);
    }
}

var peerReviewRepository = new PeerReviewRepository();
module.exports = peerReviewRepository;