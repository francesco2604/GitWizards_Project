const express = require('express');
var functions = require('../controllers/exams.controller.js');
var result_response               = require('../models/error.model')
var router = express.Router();

// METHOD GET LIST FOR  STUDENT TEACHER AND
router.get('/', async (req,res) => {
	var examList = functions.getExamsList();
	res.status(200).json(examList);
});

module.exports = router
