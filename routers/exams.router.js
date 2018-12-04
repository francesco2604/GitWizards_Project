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
//METHOD GET ID FOR TEACHER AND STUDENT
router.get('/:id',async (req,res) => {
	if(isNaN(req.params.id))
	  sendErrorResponse(res, result_response.ERROR_CODE.BAD_REQUEST, "Errore durante la registrazione esame nel sistema");
	else{
		var id = parseInt(req.params.id);
		var exam_risposta = functions.getExamsById(id);
		if(exam_risposta==='ErrorCatch')
	  sendErrorResponse(res, result_response.ERROR_CODE.BAD_REQUEST, "Errore  nel sistema");
		else {
			if(exam_risposta==='Not Found')
			sendErrorResponse(res, result_response.ERROR_CODE.NOT_FOUND , "Non trovato");

			else
			res.status(200).location('/v1/exams/${req.params.id}').json(exam_risposta)

		}
	}});

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

  router.delete('/:id',async (req,res) => {
  	if(isNaN(req.params.id))
  	sendErrorResponse(res, result_response.ERROR_CODE.BAD_REQUEST, "Errore nel sistema");
  	else{
  		var id = parseInt(req.params.id);
  		var identity= req.headers;
  		var risposta=functions.deleteExamsById(id,identity);
  		if(risposta==='Not Found')
  	sendErrorResponse(res, result_response.ERROR_CODE.NOT_FOUND , "Non trovato");
  		else{
  			if(risposta==='No permission')
  			sendErrorResponse(res, result_response.ERROR_CODE.FORBIDDEN , "Non permesso");

  			else
  				res.status(200).location('/v1/exams/${req.params.id}').json(risposta)}
  		}
  	});


module.exports = router
