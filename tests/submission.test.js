const API = require('../app');
var request = require('supertest');

/* Example variables */
var test_task = {
  numeroDomanda: 2,
  question: 'diametro della Terra?',
  type: 1,
  answers: ['9.742 km',
    '19.742 km',
    '12.742 km'],
  correctAnswer: '3',
  studentAnswer: '1'
};

var exampleExam = {
  example: null,
  description: 'esame di valutazione conoscenze generali',
  deadline: 3600,
  numerotasks: 2,
  teacher: {
    id: 32,
    firstname: 'Marco',
    lastname: 'Giunta',
    email: 'marco.giunta@example.com',
    type: 'Teacher',
    identification_number: 908765
  },
  tasks: [test_task,
    {
      id: 456,
      numeroDomanda: 3,
      question: 'diametro della Luna?',
      type: 1,
      answers: [
        '4.742 km',
        '14.742 km',
        '8.742 km'
      ],
      correctAnswer: 3
    }
  ],
  students: [
    {
      id: 12,
      firstname: 'Mario',
      lastname: 'Rossi',
      email: 'mario.rossi@example.com',
      type: 'Student',
      identification_number: 345678
    }
  ]
};

var exampleError = "123";

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