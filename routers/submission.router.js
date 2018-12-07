const EXPRESS = require('express');
const SUBMISSION_CONTROLLER = require('../controllers/submission.controller.js');

const ROUTER = EXPRESS.Router();

/* Submission POST */
ROUTER.post('/', (req, res) => {
    try {
        if (req.body instanceof Object && Object.keys(req.body).length >= 6) {
            var submission = SUBMISSION_CONTROLLER.postSubmission(req.body);
            res.status(201).json(submission);
        }
        else {
            res.status(400).send("Not a submission.\nMake sure you\'re sending a Submission json object.");
        }
    }
    catch (error) {
        res.status().end();
    }

});

module.exports = ROUTER;