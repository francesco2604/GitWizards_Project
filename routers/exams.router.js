const express = require('express');
var functions = require('../controllers/exams.controller.js');
var result_response               = require('../models/error.model')
const USER_REPOSITORY   = require('../repositories/user.repository');
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

function checkAuth(req_headers){
  if(req_headers){
    var user_id_regex = new RegExp(/^([1-9][0-9]*)$/);
    var user_role_regex = new RegExp(/^[1-2-3]$/);
    if(!req_headers['user_id'] || !user_id_regex.test(req_headers['user_id'])){
      return false;
    }
    if(!req_headers['user_role'] || !user_role_regex.test(req_headers['user_role'])){
      return false;
    }
    var user_role = (typeof req_headers['user_role'] === 'string') ? parseInt(req_headers['user_role']) : req_headers['user_role'];
    var user_id = (typeof req_headers['user_id'] === 'string') ? parseInt(req_headers['user_id']) : req_headers['user_id'];
    var real_user_role = USER_REPOSITORY.getUserRoleByUserId(user_id);
    if(real_user_role !== -1 && real_user_role === user_role){
      return true;
    }
  }
  return false;
}


// METHOD GET LIST FOR  STUDENT TEACHER AND

router.get('/', async (req,res) => {
  if(isRequestOkAndHeaderHasAcceptJson(req)){
    if(checkAuth(req.headers) ){
      var examList = functions.getExamsList();
      if(examList && examList.length !== 0){
        res.status(200).json(examList);
      }else if(examList && examList.length === 0){
        res.status(200).json({ status : 200, message : 'Lista utenti vuota'});
      }else{
        console.log(examList)
        sendErrorResponse(res, result_response.ERROR_CODE.NOT_FOUND, "Errore durante il recupero della lista di exams");
      }
    }else{
      sendErrorResponse(res, result_response.ERROR_CODE.FORBIDDEN, "Accesso negato. Mancanza di permessi per accesso alla risorsa");
    }
  }else{
    //console.log(examList)
    //console.log(isRequestOkAndHeaderHasAcceptJson(req))
    sendErrorResponse(res, result_response.ERROR_CODE.NOT_FOUND, "Errore durante il recupero della lista di exams");
  }
});
//METHOD GET ID FOR TEACHER AND STUDENT
router.get('/:id',async (req,res) => {

  if(isRequestOkAndHeaderHasAcceptJson(req)&& isNaN(req.params.id)== false && isBodyJson(req)){
    if(checkAuth(req.headers) ){
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
    }
    else
    sendErrorResponse(res, result_response.ERROR_CODE.FORBIDDEN, "Accesso negato. Mancanza di permessi per accesso alla risorsa");
  }
  else
  sendErrorResponse(res, result_response.ERROR_CODE.BAD_REQUEST, "Errore durante la registrazione esame nel sistema");
});

router.post('/', (req, res) => {
  if(isRequestOkAndHeaderHasAcceptJson(req) && isBodyJson(req)){
    if(checkAuth(req.headers)) {
      var propertiesPost = req.body;
      //console.log(propertiesPost)
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
    else
    sendErrorResponse(res, result_response.ERROR_CODE.FORBIDDEN, "Accesso negato. Mancanza di permessi per accesso alla risorsa");
  }
  else {
    sendErrorResponse(res, result_response.ERROR_CODE.BAD_REQUEST, "Errore durante la registrazione utente nel sistema");
  }




})
router.put('/:id',async (req,res) => {
  if(isRequestOkAndHeaderHasAcceptJson(req) && isBodyJson(req) && isNaN(req.params.id)==false){
    if(checkAuth(req.headers)) {

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
  }
  else
  sendErrorResponse(res, result_response.ERROR_CODE.FORBIDDEN, "Accesso negato. Mancanza di permessi per accesso alla risorsa");
}
else {
  sendErrorResponse(res, result_response.ERROR_CODE.BAD_REQUEST, "Errore durante la registrazione utente nel sistema");
}


});
// METHOD DELETE FOR A TEACHER
router.delete('/:id',async (req,res) => {
  if(isRequestOkAndHeaderHasAcceptJson(req) && isBodyJson(req) && isNaN(req.params.id)==false){
    if(checkAuth(req.headers))  {
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
      else {
        sendErrorResponse(res, result_response.ERROR_CODE.FORBIDDEN, "Accesso negato. Mancanza di permessi per accesso alla risorsa");
      }

    }
    else {
      sendErrorResponse(res, result_response.ERROR_CODE.BAD_REQUEST, "Errore durante la registrazione utente nel sistema");
    }

  });


  module.exports = router
