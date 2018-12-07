const API = require('../app.js');
var request = require('supertest');

/* Test starting */
beforeAll(() => {
  console.log('API test starting!');
});

/* Test cases for Peer Review */
describe('Tests for PeerReview', () => {

  /* Test GET method in Peer Review */
  // Status: 200, OK
  test('Peerreview GET', async () => {
    let res = await request(API).get('/v1/peerreview');
    expect.assertions(1);
    expect(res.status).toBe(200);
  });

  // Status: 204, No peer reviews
  test('Peerreview GET', async () => {
    let res = await request(API).get('/v1/peerreview');
    expect.assertions(1);
    expect(res.status).toBe(204);
  });

});

/* Test ending */
afterAll(() => {
  API.close();
});