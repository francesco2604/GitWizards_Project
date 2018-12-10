const API = require('../app');
var request = require('supertest');
const PEERREVIEW_REPO = require('../repositories/peerreview.repository');
const EXAM_REPO = require('../repositories/exam.repositories');

var exams = [EXAM_REPO.getExamForId(0), EXAM_REPO.getExamForId(1), EXAM_REPO.getExamForId(2)];

/* Test for Peer Review starting */
beforeAll(() => {
    console.log('API test for Peer Review starting!');
});

/* Test cases for GET method in Peer Review' */
describe('Tests for Peer Review\'s GET method', () => {

    /* Test GET method in Peer Review*/
    // Status: 200, OK (Teacher)
    test('Teacher Peer Review GET - Success', async () => {
        let res = await request(API)
            .get('/v1/peerreview')
            .set('user_role', 1).set('user_id', 3);
        expect.assertions(2);
        expect(res.status).toBe(200);
        expect(res.get('content-type')).toContain('application/json');
    });

    // Status: 200, OK (Student)
    test('Student Peer Review GET - Success', async () => {
        let res = await request(API)
            .get('/v1/peerreview')
            .set('user_role', 2).set('user_id', 1);
        expect.assertions(2);
        expect(res.status).toBe(200);
        expect(res.get('content-type')).toContain('application/json');
    });

    // Status: 400, Bad request
    test('Wrong Peer Review GET - Bad request', async () => {
        let res = await request(API)
            .get('/v1/peerreview')
            .set('user_role', 3).set('user_id', 4);
        expect.assertions(2);
        expect(res.status).toBe(400);
        expect(res.get('content-type')).not.toContain('application/json');
    });
});

/* Test cases for the methods in Peer Review */
describe('Tests for Peer Review\'s methods', () => {

    /* Test POST method in Peer Review*/
    // Status: 201, Created
    test('Peer Review POST', async () => {
        let res = await request(API)
            .post('/v1/peerreview')
            .send(exams[2])
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
});
/* Test cases for PUT method in Peer Review */
describe('Tests for Peer Review\'s PUT method', () => {

    /* Test PUT method in Peer Review*/
    // Status: 200, OK (Modified)
    test('Peer Review PUT - Success', async () => {
        let res = await request(API)
            .put('/v1/peerreview/1')
            .send(PEERREVIEW_REPO.getPeerReviewByID(1))
            .set('user_role', 1).set('user_id', 3);
        expect.assertions(2);
        expect(res.status).toBe(200);
        expect(res.get('content-type')).toContain('application/json');
    });

    // Status: 401, Unauthorized
    test('Peer Review PUT - Wrong role of user', async () => {
        let res = await request(API)
            .put('/v1/peerreview/1')
            .send(PEERREVIEW_REPO.getPeerReviewByID(0))
            .set('user_role', 3).set('user_id', 4);
        expect.assertions(2);
        expect(res.status).toBe(401);
        expect(res.body).not.toContain('examid');
    });

    // Status: 404, Not fund
    test('Peer Review PUT - Not found', async () => {
        let res = await request(API)
            .put('/v1/peerreview/20')
            .send(PEERREVIEW_REPO.getPeerReviewByID(0))
            .set('user_role', 2).set('user_id', 5);
        expect.assertions(1);
        expect(res.status).toBe(404);
    });

    // Status: 400, Bad request
    /*test('Peer Review PUT - Bad request', async () => {
        let res = await request(API)
            .put('/v1/peerreview/2')
            .send(PEERREVIEW_REPO.getPeerReviewByID(0))
            .set('user_role', 2).set('user_id', 5);
        expect.assertions(1);
        expect(res.status).toBe(400);
    });*/

});

/* Test ending */
afterAll(() => {
    API.close();
});