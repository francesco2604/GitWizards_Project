'use strinct'

//============= IMPORTS ====================
const EXPRESS           = require('express');
const USERS_CONTROLLER  = require('../controllers/users.controller');
var Error               = require('../models/error.model')
const ROUTER            = EXPRESS.Router();

// ====== UTILS FUNCTIONS ================
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
    res.status(error_code).json(new Error(error_code, error_message));
}

// ===== API endoints routes =====
ROUTER.route('/')
    .post((req, res) => {
        if(isRequestOkAndHeaderHasAcceptJson(req) && isBodyJson(req)){
            var insertedUser = USERS_CONTROLLER.processPostRequest(req.body);
            if(insertedUser){
                res.status(201).location(`/v1/users/${insertedUser.id}`).json(insertedUser);
            }else{
                sendErrorResponse(res, Error.ERROR_CODE.BAD_REQUEST, "Errore durante la registrazione utente nel sistema");
            }
        }else{
            sendErrorResponse(res, Error.ERROR_CODE.BAD_REQUEST, "Errore durante la registrazione utente nel sistema");
        }
    });

module.exports = ROUTER;
