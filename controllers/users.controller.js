'use strict'

//============= IMPORTS ====================
var User            = require('../models/user.model');
var Error           = require('../models/error.model');
var user_repository = require('../repositories/user.repository');

// ====== UTILS FUNCTIONS ================
function sendErrorResponse(res, error_code, error_message){
    res.status(error_code).json(new Error(error_code, error_message));
}
function checkCommonUserObjectProperties(user_obj){
    var firstname_lastname_reg = new RegExp(/^[\w\s]+$/); // not all names checked
    var email_reg = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/); // not all email checked
    if(!user_obj.firstname || !firstname_lastname_reg.test(user_obj.firstname)){
        return false;
    }
    if(!user_obj.lastname || !firstname_lastname_reg.test(user_obj.lastname)){
        return false;
    }
    if(!user_obj.email || !email_reg.test(user_obj.email)){
        return false;
    }
    if(!user_obj.user_type || !typeof user_obj.user_type === 'number'){
        return false;
    }
    if(!user_obj.user_type.toString.length === 1){
        return false;
    }
    if(!user_obj.user_type === User.USER_TYPE.STUDENT
        || !user_obj.user_type ===  User.USER_TYPE.TEACHER
        || !user_obj.user_type ===  User.USER_TYPE.BOTH){
        return false;
    }
    if(!user_obj.identification_number || !typeof user_obj.identification_number === 'number'){
        return false;
    }
    if(!user_obj.identification_number.toString.length === 6){
        return false;
    }
    return true;
}
function isBodyJsonAndContainValidUser(req, req_type){
    if(req.headers['content-type'].indexOf('application/json') !== -1){
        if(req.body && typeof req.body === 'object'){
            if(req_type === 'POST' && Object.keys(req.body).length === 5){
                if(req.body.id){
                    return false;
                }
            }else{
                return false;
            }
            return checkCommonUserObjectProperties(req.body);
        }
    }
    return false;
}
function isRequestOkAndHeaderHasAcceptJson(req){
    if(req && req.headers){
        if(req.headers['accept'].indexOf('application/json') !== -1){
            return true;
        }
    }
    return false;
}

// ======= METHODS FUNCTIONS =================
function postUser(req, res){
    if(isRequestOkAndHeaderHasAcceptJson(req)){
        if(isBodyJsonAndContainValidUser(req, 'POST')){
            var user = new User(-1, req.body.firstname, req.body.lastname, req.body.email, req.body.user_type, req.body.identification_number);
            var new_user_id = user_repository.createNewUser(user);
            user = user_repository.getUserById(new_user_id);
            if(user){
                res.status(201).location(`/v1/users/${user.id}`).json(user);
            }else{
                // TO DO IMPLEMENTATION SERVER ERROR
                // For now we are using Map and therefore there should be no errors from the server
            }
        }
    }
    sendErrorResponse(res, Error.ERROR_CODE.BAD_REQUEST, "Errore durante la registrazione utente nel sistema");
}

module.exports = { postUser }
