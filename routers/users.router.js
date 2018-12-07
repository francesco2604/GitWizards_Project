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
function checkUserId(user_id){
    var user_id_regex = new RegExp(/^([1-9][0-9]*)$/);
    return user_id && (user_id_regex.test(user_id));
}
function checkAuthentication(user_id){
    return (checkUserId(user_id) && (USER_REPOSITORY.getUserById(parseInt(user_id)) !== undefined));
}
function checkAuthorization(user_id, user_role){
    var user_role_regex = new RegExp(/^[2-3]$/);
    if(user_role && (user_role_regex.test(user_role))){
        var real_user_role = USER_REPOSITORY.getUserRoleByUserId(parseInt(user_id));
        return ((real_user_role !== -1) && (real_user_role === parseInt(user_role) || real_user_role === User.USER_TYPE.BOTH));
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
            var user_id = req.headers['user_id'];
            var user_role = req.headers['user_role'];
            if(checkAuthentication(user_id) && checkAuthorization(user_id, user_role)){
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
            sendErrorResponse(res, Error.ERROR_CODE.NOT_FOUND, "Errore durante il recupero della lista di utenti");
        }
    });
ROUTER.route('/:id')
    .delete((req, res) => {
        if(isRequestOkAndHeaderHasAcceptJson(req) && checkUserId(req.params.id)){
            var auth_user_id = req.headers['user_id'];
            if(checkAuthentication(auth_user_id) && (parseInt(auth_user_id) === parseInt(req.params.id))){
                var deleted = USERS_CONTROLLER.processDeleteUserRequest(parseInt(req.params.id));
                if(deleted){
                    res.status(200).json({ status : 200, message : 'Cancellazione effettuata con successo.'});
                }else{
                    sendErrorResponse(res, Error.ERROR_CODE.INTERNAL_ERROR, 'Errore durante la cancellazione. Errore intero.');
                }
            }else{
                sendErrorResponse(res, Error.ERROR_CODE.FORBIDDEN, 'Accesso negato. Mancanza di permessi per eliminare la risorsa.');
            }
        }else{
            sendErrorResponse(res, Error.ERROR_CODE.BAD_REQUEST, "Errore nella cancellazione. Parametri non corretti.");
        }
    });

module.exports = ROUTER;
