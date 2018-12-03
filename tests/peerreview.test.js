const request = require('supertest');
const API = require('../app.js');

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

  // Status: 404, Not found
  test('Peerreview GET', async () => {
    let res = await request(API).get('/v1/peereview');
    expect.assertions(1);
    expect(res.status).toBe(404);
  });

});

afterAll(() => {
  API.close();
});