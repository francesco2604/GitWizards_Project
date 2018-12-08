const DATA = require('../repositories/submission.repository');

var submissions = [DATA.exam];

/* POST method for Submission */
function postSubmission(bodyObject) {
    var new_exam = bodyObject;
    var submissionsLength = submissions.length;
    
    new_exam.id = submissionsLength;
    submissions.push(new_exam);

    return submissions[submissionsLength];
};

module.exports = { postSubmission };