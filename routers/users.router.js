'use strinct'

const EXPRESS           = require('express');
const USERS_CONTROLLER  = require('../controllers/users.controller');
const ROUTER            = EXPRESS.Router();

// ===== API endoints routes =====
ROUTER.post('/', USERS_CONTROLLER.postUser);

module.exports = ROUTER;
