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
var taskgroupRouter = require('./routers/taskgroup.router.js');
var examsRouter = require('./routers/exams.router.js');
/* API routers */
app.use('/v1/users',USERS_ROUTER);
app.use('/v1/taskgroup',taskgroupRouter);
app.use('/v1/exams', examsRouter);
/* API error handler */
app.use(function (err, req, res, next) {
  res.status(Error.ERROR_CODE.BAD_REQUEST).json(new Error(Error.ERROR_CODE.BAD_REQUEST, 'Richiesta non valida'));
});
const PORT = process.env.PORT || 3000;
const SERVER = app.listen(PORT, () =>{
    console.log(`Server is up and running on port ${PORT}`);
});

module.exports = SERVER;
