/* Example variables */
var task = {
    numeroDomanda: 3,
    question: 'diametro della Terra?',
    type: 1,
    answers: ['9.742 km',
        '19.742 km',
        '12.742 km'],
    correctAnswer: '3',
    studentAnswer: '1'
};

var peerReview = {
    id: 0,
    examid: 234,
    task: task,
    studentanswer: 3,
    mark: 30,
    description: 'The task is perfect as it is',
    deadline: 900
}

var peerReviews = [peerReview];

/* GET method for Peer Review */
function getPeerreviewAll() {
    var result;
    try {
        if (peerReviews == null) {
            result = null;
        }
        else { result = peerReviews; }
        return result;
    }
    catch (error) {
        res.status().end();
    }
}

module.exports = { getPeerreviewAll };