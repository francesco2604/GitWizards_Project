'use strict';

// === IMPORTS ===
const EXPRESS       = require('express');
const BODY_PARSER   = require('body-parser');
var Error           = require('./models/error.model');

/* Init Express server instance */
var app = EXPRESS();

/* Set parsing module for requests body */
app.use(BODY_PARSER.json());

/* Init router components*/
const USERS_ROUTER = require('./routers/users.router');
const TASK_GROUP_ROUTER = require('./routers/taskgroup.router');
const EXAMS_ROUTER = require('./routers/exams.router');
const SUBMISSION_ROUTER = require('./routers/submission.router');
const PEERREVIEW_ROUTER = require('./routers/peerreview.router');
const TASK_ROUTER = require('./routers/task.router');

/* API routers */
app.use('/v1/users',USERS_ROUTER);
app.use('/v1/taskgroup',TASK_GROUP_ROUTER);
app.use('/v1/exams', EXAMS_ROUTER);
app.use('/v1/submission', SUBMISSION_ROUTER);
app.use('/v1/peerreview', PEERREVIEW_ROUTER);
app.use('/v1/task', TASK_ROUTER);
app.use('*', (req, res) => {
    res.status(Error.ERROR_CODE.BAD_REQUEST).json(new Error(Error.ERROR_CODE.BAD_REQUEST, 'URL richiesto non valido'));
});

/* API error handler */
app.use((err, req, res, next) => {
    console.error(err);
    res.status(Error.ERROR_CODE.INTERNAL_ERROR).json(new Error(Error.ERROR_CODE.INTERNAL_ERROR, 'Errore interno del server'));
});

const PORT = process.env.PORT || 3000;
const SERVER = app.listen(PORT, () =>{
    console.log(`Server is up and running on port ${PORT}`);
});

module.exports = SERVER;
