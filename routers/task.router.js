'use strinct'

//============= IMPORTS ====================
const EXPRESS           = require('express');
const functions         = require('../controllers/tasks.controller.js');
const TASK_REPOSITORY   = require('../repositories/task.repository');
var Error               = require('../models/error.model');
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
        return true;
    }
    return false;
}
function sendErrorResponse(res, error_code, error_message){
    res.status(error_code).json(new Error(error_code, error_message));
}

// ===== API endoints routes =====
ROUTER.post('/', (req, res) => {
    if(isRequestOkAndHeaderHasAcceptJson(req) && isBodyJson(req)){
        var insertedTask = functions.postTasks(req.body['task']);
        if(insertedTask){
            res.status(200).location(`/v1/task/${insertedTask._id}`).json(insertedTask);
        }else{
            sendErrorResponse(res, Error.ERROR_CODE.BAD_REQUEST, "Errore durantel'aggiunta della task nel sistema");
        }
    }else{
        sendErrorResponse(res, Error.ERROR_CODE.BAD_REQUEST, "Errore durante l'aggiunta della task nel sistema");
    }
});

//METHOD GET ID FOR TASK
ROUTER.get('/?',async (req,res) => {
    if(isRequestOkAndHeaderHasAcceptJson(req) && !isNaN(parseInt(req.query['task_id'])) && isBodyJson(req)){
        var id = parseInt(req.query['task_id']);
        var task_risposta = functions.getTaskById(id);
        if(task_risposta === 'ErrorCatch')
            sendErrorResponse(res, Error.ERROR_CODE.BAD_REQUEST, "Errore  nel sistema");
        else {
            if(task_risposta === 'Not Found' || task_risposta === 'No Result')
                sendErrorResponse(res, Error.ERROR_CODE.NOT_FOUND , "Non trovato");
            else
                res.status(200).location('/v1/task/${req.params.id}').json(task_risposta)
        }
    }
    else
        sendErrorResponse(res, Error.ERROR_CODE.FORBIDDEN, "Accesso negato. Mancanza di permessi per accesso alla risorsa");
});

//METHOD PUT ID FOR TASK
ROUTER.put('/?', (req,res) =>
{
    var identity = req.headers;
    var taskid = parseInt(req.query['task_id']);
    var task = req.body['task'];

    if(taskid !== null && taskid !== undefined && task !== null && task !== undefined)
    {
        var response = functions.putTaskById(taskid, task,identity);
        //console.log(response);
        if(response !== null)
        {
            res.status(200).json(response);
        }
        else
        {
            res.status(error404.code).json(error404);
        }
    }
    else
    {
        res.status(error400.code).json(error400);
    }
});

// METHOD DELETE FOR A TEACHER
ROUTER.delete('/?',async (req,res) => {
    var identity = req.headers;
    var taskid = parseInt(req.query['task_id']);
    if(taskid !== null && taskid !== undefined){
        var risposta = functions.deleteTaskById(taskid,identity);
        if(risposta === 'Not Found')
            sendErrorResponse(res, Error.ERROR_CODE.NOT_FOUND , "Non trovato");
        else{
            if(risposta === 'No permission')
                sendErrorResponse(res, Error.ERROR_CODE.FORBIDDEN , "Non permesso");

            else
                res.status(200).location('/v1/task/${taskid}').json('Il task  è stato eliminato con successo')
        }
    }
    else {
        sendErrorResponse(res, Error.ERROR_CODE.FORBIDDEN, "Accesso negato. Mancanza di permessi per accesso alla risorsa");
    }
});

module.exports = ROUTER;
