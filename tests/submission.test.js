const request = require('supertest');
const API = require('../app.js');

beforeAll(() => {
 console.log('API test for Submission starting!');
});

/* Test cases for Submission */
describe('Tests for PeerReview', () => {
  
  /* Test POST method in Submission*/
  // Status: 201, Created
  test('Submissions POST', async () => {
    let res = await request(API).post('/v1/submissions');
    expect.assertions(2);
    expect(res.status).toBe(201);
    expect(res.get('content-type')).toContain('application/json');
  });

});

afterAll(() => {
  API.close();
});