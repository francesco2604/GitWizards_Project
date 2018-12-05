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

//test for get exams list for teacher and student
test("response 202 for get the examslist", async function () {
  var response = await request(server).get('/v1/exams/');
  expect(response.status).toBe(200);

});
test("validate response of get list ", async function () {

  var response = await request(server).get('/v1/exams/');
  var exams = response.body;
  expect(response.body).toBeDefined();
});
//test for get an exam from list for student and teacher

test("response 202 for get a exam from list", async function () {
  var response = await request(server).get('/v1/exams/2');
  expect(response.status).toBe(200);
});


test(" response 404 for get a exam from list ", async function () {

  var response = await request(server).get('/v1/exams/877');
  expect(response.status).toBe(404);
});

test(" response 400 for get a exam  from list ", async function () {

  var response = await request(server).get('/v1/exams/ethjy');
  expect(response.status).toBe(400);
});


test("validate response of get by id  in a exam  list ", async function () {

  var response = await request(server).get('/v1/exams/2');
  var exam = response.body;
  expect(response.body.id).toBeDefined();
  expect(response.body.description).toBeDefined();
  expect(response.body.deadline).toBeDefined();
  expect(response.body.numerotasks).toBeDefined();
  expect(response.body.teacher).toBeDefined();
  expect(response.body.tasks).toBeDefined();
  expect(response.body.students).toBeDefined();
});

//test for post an exam

test(" response 403 for post a exam ----no user id ", async function () {
  var response = await request(server).post('/v1/exams/').send(new Exam(66, 'prova3', 3600, 2,teacher, tasks,students)).set('user_id','3').set('user_role','2').set('content-type', 'application/json').set('accept', 'application/json');

  expect(response.status).toBe(403);
});
test(" response 403 for post a exam ----no user role", async function () {
  var response = await request(server).post('/v1/exams/').send(new Exam(66, 'prova3', 3600, 2,teacher, tasks,students)).set('user_id','32').set('user_role','1').set('content-type', 'application/json').set('accept', 'application/json');
  expect(response.status).toBe(403);
});
test("validate response for post a exam", async function () {
    var response = await request(server).post('/v1/exams/').send(new Exam(66, 'prova3', 3600, 2,teacher, tasks,students)).set('user_id','32').set('user_role', '2' ).set('content-type', 'application/json').set('accept', 'application/json');
  expect(response.status).toBe(200);
});

//PUT TEST
test(" response 400 for put a exam  from list id", async function () {

  var response = await request(server).put('/v1/exams/2').send(new Exam(2, 'prova3333333333', 3600, 2,teacher, tasks,students)).set('user_id','3').set('user_role','2').set('content-type', 'application/json').set('accept', 'application/json');

  expect(response.status).toBe(403);
});
test(" response 400 for put a exam  from list role", async function () {

  var response = await request(server).put('/v1/exams/2').send(new Exam(2, 'prova3333333333', 3600, 2,teacher, tasks,students)).set('user_id','32').set('user_role','1').set('content-type', 'application/json').set('accept', 'application/json');

  expect(response.status).toBe(403);
});
test(" response 404 for put a exam  from list ", async function () {

  var response = await request(server).put('/v1/exams/8888787').send(new Exam(2, 'prova3333333333', 3600, 2,teacher, tasks,students)).set('user_id','32').set('user_role','2').set('content-type', 'application/json').set('accept', 'application/json');

  expect(response.status).toBe(404);
});
test(" response 404 for put a exam  from list ", async function () {

  var response = await request(server).put('/v1/exams/cdevdevde').send(new Exam(2, 'prova3333333333', 3600, 2,teacher, tasks,students)).set('user_id','32').set('user_role','2').set('content-type', 'application/json').set('accept', 'application/json');;
  expect(response.status).toBe(400);
});

test(" response 200 for PUT  from list ", async function () {

  var response = await request(server).put('/v1/exams/2').send(new Exam(2, 'prova3333333333', 3600, 2,teacher, tasks,students)).set('user_id','32').set('user_role','2').set('content-type', 'application/json').set('accept', 'application/json');
//console.log(response.status);
  expect(response.status).toBe(200);
});

// test for delete an exams
test(" response 404 for delete a exam", async function () {

  //expect(exams.postExam().toEqual(exams.statusok);
  var response = await request(server).delete('/v1/exams/88558').set('user_id','32').set('user_role','2');
  expect(response.status).toBe(404);

});

test(" response 400 for delete a exam", async function () {

  //expect(exams.postExam().toEqual(exams.statusok);
  var response = await request(server).delete('/v1/exams/dfgr').set('user_id','32').set('user_role','2');
  expect(response.status).toBe(400);

});
test(" response 400 for delete a exam no id", async function () {

  //expect(exams.postExam().toEqual(exams.statusok);
  var response = await request(server).delete('/v1/exams/2').set('user_id','2').set('user_role','2');
  expect(response.status).toBe(403);

});

test(" response 400 for delete a exam no role", async function () {

  //expect(exams.postExam().toEqual(exams.statusok);
  var response = await request(server).delete('/v1/exams/5').set('user_id','32').set('user_role','1');
  expect(response.status).toBe(403);

});
test(" response 200 for delete a exam", async function () {

  //expect(exams.postExam().toEqual(exams.statusok);
  var response = await request(server).delete('/v1/exams/2').set('user_id','32').set('user_role','2');
  //console.log(response.status)
  expect(response.status).toBe(200);

});

// close server
afterAll(() => {
  server.close();
});
