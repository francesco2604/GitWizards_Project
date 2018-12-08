const API = require('../app');
var request = require('supertest');
const DATA = require('../repositories/peerreview.repository');


/* Test starting */
beforeAll(() => {
  console.log('API test starting!');
});

/* Test cases for Peer Review */
describe('Tests for PeerReview', () => {

  /* Test GET method in Peer Review*/
  // Status: 200, OK (Teacher)
  test('Teacher Peerreview GET', async () => {
    let res = await request(API)
      .get('/v1/peerreview')
      .set('user_role', 'Teacher')
      .set('user_id', 3);
    expect.assertions(1);
    expect(res.status).toBe(200);
  });

  // Status: 200, OK (Student)
  test('Student Peerreview GET', async () => {
    let res = await request(API)
      .get('/v1/peerreview')
      .set('user_role','Student')
      .set('user_id', 5);
    expect.assertions(1);
    expect(res.status).toBe(200);
  });

  // Status: 200, OK
  test('Wrong Peerreview GET', async () => {
    let res = await request(API)
      .get('/v1/peerreview')
      .set('user_role','Wrong')
      .set('user_id', 4);
    expect.assertions(1);
    expect(res.status).toBe(400);
  });

});

/* Test ending */
afterAll(() => {
  API.close();
});