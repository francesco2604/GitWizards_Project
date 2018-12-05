'use strict'

//============= IMPORTS ====================
const SERVER    = require('../app');
var request     = require('supertest');
var User        = require('../models/user.model');
var Error       = require('../models/error.model');

//============= COMMON FUNCTIONS ===================
function makePostRequest(server, url, body){
    return request(server).post(url)
                          .set('content-type', 'application/json')
                          .set('accept', 'application/json')
                          .send(body ? JSON.stringify(body) : body);
}
function makeGetRequest(server, url, headers, query_params){
    var req = request(server).get(url).set('accept', 'application/json');
    if(headers){
        headers.forEach((header) => {
            req = req.set(header);
        });
    }
    if(query_params){
        query_params.forEach((query_param) => {
            req = req.query(query_param);
        });
    }
    return req.send();
}
function checkError(response, error){
    var error_obj_keys = ['code', 'message']
    expect.assertions(6);
    expect(response.status).toBe(error.code);
    expect(response.get('content-type')).toContain('application/json');
    expect(response.body).not.toBeNull();
    expect(typeof response.body).toBe('object');
    expect(Object.keys(response.body).sort()).toEqual(error_obj_keys.sort());
    expect(response.body).toEqual({
        code : error.code,
        message: error.message
    });
}

// ============ TESTS =======================
describe('## API users', () => {

    // common
    var general_error = new Error(Error.ERROR_CODE.BAD_REQUEST, 'Richiesta non valida');
    var no_permission_error =  new Error(Error.ERROR_CODE.FORBIDDEN, 'Accesso negato. Mancanza di permessi per accesso alla risorsa');
    var user_obj_keys = ['id', 'firstname', 'lastname', 'email', 'user_type', 'identification_number'];

    describe('POST /v1/users - create new user into the system', () => {
        // common
        var good_user   = new User(undefined, 'Mario', 'Rossi', 'mario.rossi@gmail.com', User.USER_TYPE.STUDENT, 123456);
        var bad_users = [ undefined, new User(undefined, 'Mario', 'Rossi', 'mario.rossi@gmail.com'), '', null];
        var post_error  = new Error(Error.ERROR_CODE.BAD_REQUEST, "Errore durante la registrazione utente nel sistema");

        test('should create new user if the request-body object is a valid User instance', async () => {
            var response = await makePostRequest(SERVER, '/v1/users', good_user);
            expect.assertions(12);
            expect(response.status).toBe(201);
            expect(response.get('content-type')).toContain('application/json');
            expect(response.get('location')).toContain('/v1/users/'); // here we should put regex
            expect(response.body).not.toBeNull();
            expect(typeof response.body).toBe('object');
            expect(Object.keys(response.body).sort()).toEqual(user_obj_keys.sort());
            expect(typeof response.body.id).toBe('number');
            expect(response.body.firstname).toBe(good_user.firstname);
            expect(response.body.lastname).toBe(good_user.lastname);
            expect(response.body.email).toBe(good_user.email);
            expect(response.body.user_type).toBe(good_user.user_type);
            expect(response.body.identification_number).toBe(good_user.identification_number);
            return;
        });
        test('should reject the creation of new user if request body is undefined', async() => {
            var response = await makePostRequest(SERVER, '/v1/users', bad_users[0]);
            checkError(response, post_error);
            return;
        });
        test('should reject the creation of new user if request body is not a valid User instance', async() => {
            var response = await makePostRequest(SERVER, '/v1/users', bad_users[1]);
            checkError(response, post_error);
            return;
        });
        test('should reject the creation of new user if request body is empty', async() => {
            var response = await makePostRequest(SERVER, '/v1/users', bad_users[2]);
            checkError(response, post_error);
            return;
        });
        test('should reject the creation of new user if request body is null', async() => {
            var response = await makePostRequest(SERVER, '/v1/users', bad_users[3]);
            checkError(response, general_error);
            return;
        });
    });
    describe('GET /v1/users - return the list of users available in system', () => {
        //common
        var good_user_type = User.USER_TYPE.TEACHER;
        var bad_user_type = 5;
        var good_headers = [{ user_id : 2},{user_role : User.USER_TYPE.TEACHER}];
        var bad_headers = [
            [{ user_id : 2},{user_role : User.USER_TYPE.STUDENT }],
            [{ user_id : 1},{user_role : User.USER_TYPE.STUDENT }]
        ];
        var get_user_list_error = new Error(Error.ERROR_CODE.NOT_FOUND, 'Errore durante il recupero della lista di utenti');

        test('should return a valid JSON array if user has the permissions to view the users list', async () => {
            var response = await makeGetRequest(SERVER, '/v1/users', good_headers);
            expect.assertions(4);
            expect(response.status).toBe(200);
            expect(response.get('content-type')).toContain('application/json');
            expect(response.body).not.toBeNull();
            expect(typeof response.body).toBe('array');
            return;
        });
        test('should return a list of users with correct properties if user has the permissions to view the users list', async () => {
            var response = await makeGetRequest(SERVER, '/v1/users', good_headers);
            expect.assertions(8);
            expect(Object.keys(response.body[0]).sort()).toEqual(user_obj_keys.sort());
            expect(typeof response.body[0].id).toBe('number');
            expect(typeof response.body[0].firstname).toBe('string');
            expect(typeof response.body[0].lastname).toBe('string');
            expect(typeof response.body[0].email).toBe('string');
            expect(typeof response.body[0].user_type).toBe('number');
            expect(typeof response.body[0].identification_number).toBe('number');
            expect(response.body[0]).toEqual({
                id : 1,
                firstname : 'Mario',
                lastname : 'Rossi',
                email: 'mario.rossi@example.com',
                user_type : User.USER_TYPE.STUDENT,
                identification_number : 123456
            });
            return;
        });
        test('should return a valid JSON array if user has the permissions to view the users list and if he has ' +
             'set a valid user type in the URL', async () => {
            var response = await makeGetRequest(SERVER, '/v1/users', good_headers, [{ type : User.USER_TYPE.STUDENT }]);
            expect.assertions(4);
            expect(response.status).toBe(200);
            expect(response.get('content-type')).toContain('application/json');
            expect(response.body).not.toBeNull();
            expect(typeof response.body).toBe('array');
            return;
        });
        test('should return a list of users with correct properties if user has the permissions to view the users list. ' +
             ' All the users in the list should have user type equal to the one specified by the user in the URL', async () => {
            var response = await makeGetRequest(SERVER, '/v1/users', good_headers, [{ type : User.USER_TYPE.STUDENT }]);
            expect.assertions(11);
            expect(Object.keys(response.body[0]).sort()).toEqual(user_obj_keys.sort());
            expect(typeof response.body[0].id).toBe('number');
            expect(typeof response.body[0].firstname).toBe('string');
            expect(typeof response.body[0].lastname).toBe('string');
            expect(typeof response.body[0].email).toBe('string');
            expect(typeof response.body[0].user_type).toBe('number');
            expect(typeof response.body[0].identification_number).toBe('number');
            expect(response.body[0]).toEqual({
                id : 1,
                firstname : 'Mario',
                lastname : 'Rossi',
                email: 'mario.rossi@example.com',
                user_type : User.USER_TYPE.STUDENT,
                identification_number : 123456
            });
            response.body.forEach((user) => {
                expect(user.user_type).toBe(User.USER_TYPE.STUDENT);
            });
            return;
        });
        test('should return error if user has permissions to view the list but he/she has specified a wrong user type in the URL', async() => {
            var response = await makeGetRequest(SERVER, '/v1/users', good_headers, [{ type : bad_user_type }]);
            checkError(response, get_user_list_error);
            return;
        });
        test('should return error if user has no permissions to view the list: user role is different from the one specified in the header', async() => {
            var response = await makeGetRequest(SERVER, '/v1/users',  bad_headers[0]);
            checkError(response, no_permission_error);
            return;
        });
        test('should return error if user has no permissions to view the list: the type of user has not the right to access to this resource', async() => {
            var response = await makeGetRequest(SERVER, '/v1/users',  bad_headers[1]);
            checkError(response, no_permission_error);
            return;
        });
    });
});

// ==== CLOSE THINGS =====
afterAll(() => {
    SERVER.close();
});
