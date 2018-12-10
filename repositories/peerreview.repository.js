var UserRepo = require('../repositories/user.repository.js');
var TaskRepo = require('../repositories/task.repository.js');
var ExamRepo = require('../repositories/exam.repositories.js');

var PeerReview = require('../models/peerreview.model');

var tasks = [TaskRepo.getTaskById(1), TaskRepo.getTaskById(2)];

class PeerReviewRepository {

    constructor() {
        this._peerReviews = new Map([
            [1, new PeerReview(0, 1, 1, tasks[0], 3, 30, 'Example n. 1', '12.21.18')],
            [2, new PeerReview(1, 2, 1, tasks[0], 2, 20, 'Example n. 2', '02.01.19')],
            [3, new PeerReview(2, 3, 2, tasks[1], 2, 24, 'Example n. 3', '03.01.19')]
        ]);
    };

    createPeerReview(review) {
        let newID = this._peerReviews.size;
        review.id = newID;
        this._peerReviews.set(newID, review);
        return newID;
    };

    getLength() {
        return this._peerReviews.size;
    };

    getAllPeerReviews() {
        return this._peerReviews;
    };

    getPeerReviewsPerStudent(studentID) {
        let length = this._peerReviews.size;
        let reviews = [];
        this._peerReviews.forEach((value, key, map) => {
            if (value._studentid == studentID) {
                reviews.push(value);
            }
        })
        return reviews;
    };

    getPeerReviewByID(peerReviewID) {
        return this._peerReviews.get(peerReviewID);
    };

    getLastPeerReview() {
        return this._peerReviews.get(this._peerReviews.size);
    };

    setPeerReviewByID(reviewID, review) {
        this._peerReviews.set(reviewID, review);
        return this._peerReviews.get(reviewID);
    };
}

var peerReviewRepository = new PeerReviewRepository();
module.exports = peerReviewRepository;
