'use strict'

//============= IMPORTS ====================
var User            = require('../models/user.model');
var user_repository = require('../repositories/user.repository');

// ====== UTILS FUNCTIONS ================
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
function isBodyAValidUserObj(body_obj, req_type){
    if(req_type === 'POST' && Object.keys(body_obj).length === 5 && !body_obj.id){
        return checkCommonUserObjectProperties(body_obj);
    }else{
        return false;
    }
}
function isUserTypeQueryValid(user_type){
    if(user_type === undefined){
        return true;
    }
    var user_type_regex = new RegExp(/^[1-3]$/);
    if(!user_type || !user_type_regex.test(user_type)){
        return false;
    }
    return true;
}

// ======= METHODS FUNCTIONS =================
function processPostRequest(body_obj){
    if(isBodyAValidUserObj(body_obj, 'POST')){
        var user = new User(-1, body_obj.firstname, body_obj.lastname, body_obj.email, body_obj.user_type, body_obj.identification_number);
        var new_user_id = user_repository.createNewUser(user);
        user = user_repository.getUserById(new_user_id);
        return user;
    }else{
        return null;
    }
}
function processGetAllRequest(user_type_filter){
    if(isUserTypeQueryValid(user_type_filter)){
        if(user_type_filter){
            user_type_filter = (typeof user_type_filter === 'string') ? parseInt(user_type_filter) : user_type_filter;
            return user_repository.getAllUsers(user_type_filter);
        }else{
            return user_repository.getAllUsers();
        }
    }
    return null;
}

module.exports = { processPostRequest, processGetAllRequest }
