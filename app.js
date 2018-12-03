'use strict';

/* Init libs and Express server instance */
const EXPRESS       = require('express');
const BODY_PARSER   = require('body-parser');
var app = EXPRESS();

/* Set parsing module for requests body */
app.use(BODY_PARSER.json());

/* Init router components*/
const USERS_ROUTER = require('./routers/users.router');

/* API routers */
app.use('/v1/users', USERS_ROUTER);

const PORT = process.env.PORT || 3000;
const SERVER = app.listen(PORT, () =>{
    console.log(`Server is up and running on port ${PORT}`);
});

module.exports = SERVER;
