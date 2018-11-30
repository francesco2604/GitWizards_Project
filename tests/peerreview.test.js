const request = require('supertest');
const API = require('../app.js');

beforeAll(() => {
 console.log('API test starting!');
});

// raggruppa più test cases
describe('Tests for PeerReview and Submissions', () => {
  
  // test per il metodo GET di /peerreview
  test('Peerreview GET', async () => {
    let res = await request(API).get('/peerreview');
    expect.assertions(1);
    expect(res.status).toBe(200);
  });

});

afterAll(() => {
  API.close();
});