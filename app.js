'use strict';   // used to avoid using undeclared variables and write cleaner code

/* Init libs and Express server instance */
const EXPRESS       = require('express');
const BODY_PARSER   = require('body-parser');

var app = EXPRESS();

/* Set parsing module for requests body */
app.use(BODY_PARSER.json());

/* Init router components*/
// example: var userRouter = require('./routers/users');

var examsRouter = require('./routers/exams.router.js');

/* API routers */
// example:  app.use('/v1/users', userRouter);
app.use(BODY_PARSER.urlencoded({ extended: false }));
app.use(BODY_PARSER.json());
app.use('/v1/exams',examsRouter);

/* API routers */
// example: [ app.use('/v1/users', userRouter); ]


const PORT = process.env.PORT || 3000;
const SERVER = app.listen(PORT, () =>{
    console.log(`Server is up and running on port ${PORT}`);
});

module.exports = SERVER;
