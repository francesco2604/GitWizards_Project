const express = require('express');
var functions = require('../controllers/exams.controller.js');
var result_response               = require('../models/error.model')
var router = express.Router();

function isRequestOkAndHeaderHasAcceptJson(req){
    if(req && req.headers){
        if(req.headers['accept'].indexOf('application/json') !== -1){
            return true;
        }
    }
    return false;
}
function isBodyJson(req){
    if(req.headers['content-type'].indexOf('application/json') !== -1){
        if(req.body && typeof req.body === 'object'){
            return true;
        }
    }
    return false;
}
function sendErrorResponse(res, error_code, error_message){
    res.status(error_code).json(new result_response(error_code, error_message));
}

// METHOD GET LIST FOR  STUDENT TEACHER AND

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
  if(isRequestOkAndHeaderHasAcceptJson(req) && isBodyJson(req)){
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
  }
  else {
    sendErrorResponse(res, Error.ERROR_CODE.BAD_REQUEST, "Errore durante la registrazione utente nel sistema");
  }
	})
router.put('/:id',async (req,res) => {
  if(isNaN(req.params.id))
    sendErrorResponse(res, result_response.ERROR_CODE.BAD_REQUEST, "Errore nel sistema");
  else{
    var propertiesChanged = req.body;
    var identity= req.headers;
    var id = parseInt(req.params.id);
    var risposta=functions.putExamsById(id, propertiesChanged,identity);
    //console.log(risposta)
    if(risposta==='Error')
      sendErrorResponse(res, result_response.ERROR_CODE.BAD_REQUEST, "Errore nel sistema");
    else{if(risposta==='Not Found')
    sendErrorResponse(res, result_response.ERROR_CODE.NOT_FOUND , "Non trovato");
    else{
      if(risposta==='No permission')
      sendErrorResponse(res, result_response.ERROR_CODE.FORBIDDEN , "Non permesso");
      else
          res.status(200).location('/v1/exams/${req.params.id}').json(risposta)
    }
  }
}});

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
