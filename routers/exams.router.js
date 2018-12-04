const express = require('express');
var functions = require('../controllers/exams.controller.js');
var result_response               = require('../models/error.model')
var router = express.Router();

function sendErrorResponse(res, error_code, error_message){
    res.status(error_code).json(new result_response(error_code, error_message));
}

// METHOD GET
router.get('/', async (req,res) => {
	var examList = functions.getExamsList();
	res.status(200).json(examList);
});







	module.exports = router
