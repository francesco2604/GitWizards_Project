const request = require('supertest');
const server  = require('../app');
var Exam = require('../models/exams.object.js');
var router = require('../routers/exams.router.js');
var functions = require('../controllers/exams.controller.js');
var ExamRepository = require('../repositories/exam.repositories.js');
const tasks = [{id: 123456,numeroDomanda: 2,question: 'diametro della Terra?',type: 1,answers: ['9.742 km','19.742 km','12.742 km'],correctAnswer: '3',studentAnswer: '1'},
                {id: 85884,numeroDomanda: 2,question: 'diametro della Terra?',type: 1,answers: ['9.742 km','19.742 km','12.742 km'],correctAnswer: '3',studentAnswer: '1'}];
var teacher ={id:32,firstname: 'mario',lastname: 'rossi',email: 'prova@gmail.com',type: 1,identification_number:123456 };
var students = [{id:89,firstname: 'francesco ',lastname: 'persi',email: 'prova@gmail.com',type: 0,identification_number:1875698 },
                {id:85,firstname: 'carlo',lastname: 'conti',email: 'prova@gmail.com',type: 0,identification_number:187525 }];

//test for get exams list
test("response 202 for get the examslist", async function () {
  var response = await request(server).get('/v1/exams/');
  expect(response.status).toBe(200);

});
test("validate response of get list ", async function () {

  var response = await request(server).get('/v1/exams/');
  var exams = response.body;
  expect(response.body).toBeDefined();
});
//test for post an exam
test("validate response for post a exam", async function () {

    var response = await request(server).post('/v1/exams/').send(new Exam(66, 'prova3', 3600, 2,teacher, tasks,students)).set('user_id','32').set('user_role', 2 );
  expect(response.status).toBe(200);
});
test(" response 400 for post a exam ----no user id ", async function () {

  var response = await request(server).post('/v1/exams/').send(new Exam(66, 'prova3', 3600, 2,teacher, tasks,students)).set('user_id','2').set('user_role','2');
  expect(response.status).toBe(403);
});
test(" response 400 for post a exam ----no user role", async function () {

  var response = await request(server).post('/v1/exams/').send(new Exam(66, 'prova3', 3600, 2,teacher, tasks,students)).set('user_id','32').set('user_role','');
  expect(response.status).toBe(403);
});

// close server
afterAll(() => {
  server.close();
});
