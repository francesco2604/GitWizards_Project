/* Example variables */
const exam_submission = { num: 42 };

/* POST method for Submission */
function postSubmission(req, res){
    var submission = await exam_submission.num;
    res.status(201).json(submission);
};

module.exports = {postSubmission};