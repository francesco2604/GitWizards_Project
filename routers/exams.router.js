const express = require('express');
var functions = require('../controllers/exams.controller.js');
var result_response               = require('../models/error.model')
var router = express.Router();

// METHOD GET LIST
router.get('/', async (req,res) => {
	var examList = functions.getExamsList();
	res.status(200).json(examList);
});
// METHOD POST FOR TEACHER
router.post('/', (req, res) => {
	var propertiesPost = req.body;
	var identity= req.headers;
	var risposta=functions.postExams(propertiesPost,identity);
	if(risposta==='Error')
		sendErrorResponse(res, result_response.ERROR_CODE.NOT_FOUND , "Non trovato");
	else{
			if(risposta==='No permission')
				sendErrorResponse(res, result_response.ERROR_CODE.FORBIDDEN , "Non permesso");
			else
				res.status(200).location('/v1/users/${risposta.id}').json(risposta);
		}
});

module.exports = router
