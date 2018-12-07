'use strinct'

//============= IMPORTS ====================
const EXPRESS           = require('express');
const USERS_CONTROLLER  = require('../controllers/users.controller');
const USER_REPOSITORY   = require('../repositories/user.repository');
var Error               = require('../models/error.model');
var User                = require('../models/user.model');
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
function checkAuthentication(req_headers){
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
    })
    .get((req, res) => {
        if(isRequestOkAndHeaderHasAcceptJson(req)){
            if(checkAuthentication(req.headers)){
                var user_role = (typeof req.headers['user_role'] === 'string') ? parseInt(req.headers['user_role']) : req.headers['user_role'];
                if(user_role === User.USER_TYPE.TEACHER || user_role === User.USER_TYPE.BOTH){
                    var usersList = USERS_CONTROLLER.processGetAllRequest(req.query.type);
                    if(usersList && usersList.length !== 0){
                        res.status(200).json(usersList);
                    }else if(usersList && usersList.length === 0){
                        res.status(200).json({ status : 200, message : 'Lista utenti vuota'});
                    }else{
                        sendErrorResponse(res, Error.ERROR_CODE.NOT_FOUND, "Errore durante il recupero della lista di utenti");
                    }
                }else{
                    sendErrorResponse(res, Error.ERROR_CODE.FORBIDDEN, "Accesso negato. Mancanza di permessi per accesso alla risorsa");
                }
            }else{
                sendErrorResponse(res, Error.ERROR_CODE.FORBIDDEN, "Accesso negato. Mancanza di permessi per accesso alla risorsa");
            }
        }else{
            sendErrorResponse(res, Error.ERROR_CODE.NOT_FOUND, "Errore durante il recupero della lista di utenti");
        }
    });

module.exports = ROUTER;
