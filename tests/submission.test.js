const API = require('../app');
var request = require('supertest');
const DATA = require('../repositories/submission.repository');

/* Example variables */
var exampleExam = DATA.exam;
var exampleError = DATA.exampleError;

/* Test starting */
beforeAll(() => {
  console.log('API test for Submission starting!');
});

/* Test cases for Submission */
describe('Tests for Submission', () => {

  /* Test POST method in Submission*/
  // Status: 201, Created
  test('Submission POST', async () => {
    let res = await request(API).post('/v1/submission').send(exampleExam);
    expect.assertions(1);
    expect(res.status).toBe(201);
  });

  // Status: 400, Not an object
  test('Submission POST', async () => {
    let res = await request(API).post('/v1/submission').send(exampleError);
    expect.assertions(1);
    expect(res.status).toBe(400);
  });

});

/* Test ending */
afterAll(() => {
  API.close();
});