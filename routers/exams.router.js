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

	router.post('/', (req, res) => {
		var propertiesPost = req.body;
		console.log(propertiesPost)
		var identity= req.headers;
		var risposta=functions.postExams(propertiesPost,identity);
		if(risposta==='Error')
		sendErrorResponse(res, result_response.ERROR_CODE.NOT_FOUND , "Non trovato");
		else{
			if(risposta==='No permission')
			sendErrorResponse(res, result_response.ERROR_CODE.FORBIDDEN , "Non permesso");
			else
			//res.status(200).json("post eseguito con successo")
			res.status(200).location('/v1/users/${risposta.id}').json(risposta);
		}
	})

module.exports = router
