const request = require('supertest');
const API = require('../app.js');

beforeAll(() => {
 console.log('API test starting!');
});

// raggruppa più test cases
describe('Tests for PeerReview', () => {
  
  // test per il metodo GET di /peerreview
  // Status: 200, OK
  test('Peerreview GET', async () => {
    let res = await request(API).get('/v1/peerreview');
    expect.assertions(1);
    expect(res.status).toBe(200);
  });

});

afterAll(() => {
  API.close();
});