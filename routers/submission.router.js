const express = require('express');
const SUBMISSION = require('../controllers/submission.controller.js');

const ROUTER = express.Router();

/* Submission POST */
ROUTER.post('/', SUBMISSION.postSubmission);

module.exports = ROUTER;