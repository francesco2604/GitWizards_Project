const API = require('../app');
var request = require('supertest');
const DATA = require('../repositories/peerreview.repository');

var exams = DATA.exams;
var peerReviews = DATA.peerReviews;

/* Test starting */
beforeAll(() => {
    console.log('API test starting!');
});

/* Test cases for Peer Review */
describe('Tests for Peer Review', () => {

    /* Test GET method in Peer Review*/
    // Status: 200, OK (Teacher)
    test('Teacher Peer Review GET', async () => {
        let res = await request(API)
            .get('/v1/peerreview')
            .set('user_role', 1).set('user_id', 3);
        expect.assertions(1);
        expect(res.status).toBe(200);
    });

    // Status: 200, OK (Student)
    test('Student Peer Review GET', async () => {
        let res = await request(API)
            .get('/v1/peerreview')
            .set('user_role', 2).set('user_id', 5);
        expect.assertions(1);
        expect(res.status).toBe(200);
    });

    // Status: 400, Bad request
    test('Wrong Peer Review GET', async () => {
        let res = await request(API)
            .get('/v1/peerreview')
            .set('user_role', 3).set('user_id', 4);
        expect.assertions(1);
        expect(res.status).toBe(400);
    });

    /* Test POST method in Peer Review*/
    // Status: 201, Created
    test('Peer Review POST', async () => {
        let res = await request(API)
            .post('/v1/peerreview')
            .send(exams[0])
            .set('user_role', 1);
        expect.assertions(2);
        expect(res.status).toBe(201);
        expect(res.get('content-type')).toContain('application/json');
    });

    // Status: 401, Unauthorized
    test('Peer Review POST', async () => {
        let res = await request(API)
            .post('/v1/peerreview')
            .send(exams[0])
            .set('user_role', 2);
        expect.assertions(1);
        expect(res.status).toBe(401);
    });

    /* Test PUT method in Peer Review*/
    // Status: 200, OK (Modified)
    test('Peer Review PUT', async () => {
        let res = await request(API)
            .put('/v1/peerreview/1')
            .send(peerReviews[0])
            .set('user_role', 1).set('user_id', 3);
        expect.assertions(2);
        expect(res.status).toBe(200);
        expect(res.get('content-type')).toContain('application/json');
    });

    // Status: 401, Unauthorized
    test('Peer Review PUT', async () => {
        let res = await request(API)
            .put('/v1/peerreview/1')
            .send(peerReviews[0])
            .set('user_role', 3).set('user_id', 4);
        expect.assertions(2);
        expect(res.status).toBe(401);
        expect(res.body).not.toContain('examid');
    });

    // Status: 404, Not fund
    test('Peer Review PUT', async () => {
        let res = await request(API)
            .put('/v1/peerreview/20')
            .send(peerReviews[0])
            .set('user_role', 2).set('user_id', 5);
        expect.assertions(1);
        expect(res.status).toBe(404);
    });

});

/* Test ending */
afterAll(() => {
    API.close();
});