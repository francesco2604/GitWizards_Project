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
function checkError(response, error){
    var error_obj_keys = ['code', 'message']
    expect.assertions(6);
    expect(response.status).toBe(Error.ERROR_CODE.BAD_REQUEST);
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

    describe('POST /v1/users - create new user into the system', () => {
        // common
        var good_user   = new User(undefined, 'Mario', 'Rossi', 'mario.rossi@gmail.com', User.USER_TYPE.STUDENT, 123456);
        var bad_users = [ undefined, new User(undefined, 'Mario', 'Rossi', 'mario.rossi@gmail.com'), '', null];
        var post_error  = new Error(Error.ERROR_CODE.BAD_REQUEST, "Errore durante la registrazione utente nel sistema");

        test('should create new user if the request-body object is a valid User instance', async () => {
            var response = await makePostRequest(SERVER, '/v1/users', good_user);
            var user_obj_keys = ['id', 'firstname', 'lastname', 'email', 'user_type', 'identification_number'];
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
});

// ==== CLOSE THINGS =====
afterAll(() => {
    SERVER.close();
});
