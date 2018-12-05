const request = require('supertest');
const server  = require('../app');
var Exam = require('../models/exams.object.js');
var router = require('../routers/exams.router.js');
var functions = require('../controllers/exams.controller.js');
var ExamRepository = require('../repositories/exam.repositories.js');
const tasks = [{id: 123456,question: 'diametro della Terra?',answers: ['9.742 km','19.742 km','12.742 km'],correct_answer: '3',student_answer: '1'},
                {id: 85884,question: 'diametro della Terra?',answers: ['9.742 km','19.742 km','12.742 km'],correct_answer: '3',student_answer: '1'}];
var teacher ={id:32,firstname: 'mario',lastname: 'rossi',email: 'prova@gmail.com',user_type: 2,identification_number:123456 };
var students = [{id:89,firstname: 'francesco',lastname: 'persi',email: 'prova@gmail.com',user_type: 1,identification_number:1875698 },
                {id:23,firstname: 'paolo',lastname: 'persi',email: 'prova@gmail.com',user_type: 1,identification_number:187546 }];

<<<<<<< HEAD

=======
>>>>>>> a16e557576c5af31f91eddc8820e87890aac49b2
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
test('should return a valid JSON array if user has the permissions to view the users list', async () => {
  var response = await request(server).get('/v1/exams/').send().set('accept', 'application/json');
  expect.assertions(11);
  expect(response.status).toBe(200);
  expect(response.get('content-type')).toContain('application/json');
  expect(response.body).not.toBeNull();
  expect(typeof response.body[0]).toBe('object');
  expect(response.body[0].id).toBeDefined();
  expect(response.body[0].description).toBeDefined();
  expect(response.body[0].deadline).toBeDefined();
  expect(response.body[0].numerotasks).toBeDefined();
  expect(response.body[0].teacher).toBeDefined();
  expect(response.body[0].tasks).toBeDefined();
  expect(response.body[0].students).toBeDefined();
  });


  test('it should return all the examsList', async () => {
  var response = await request(server).get('/v1/exams/').set('content-type', 'application/json');
  var body_keys = ['id','description','deadline','numerotasks','teacher','tasks','students']
  expect.assertions(15);
  expect(response).not.toBeNull();
  expect(response.headers).toBeDefined();
  expect(response.headers).not.toBeNull();
  expect(response.status).toBe(200);
  expect(typeof response.body[0]).toEqual('object');
  expect(response.body).toBeDefined();
  expect(response.body).not.toBeNull();
  expect(typeof response.body[0].id).toEqual('number');
  expect(typeof response.body[0].description).toEqual('string');
  expect(response.body[0].deadline).toEqual(3600);
  expect(response.body[0].numerotasks).toEqual(2);
  expect(response.body[0].teacher).toEqual(teacher);
  expect(response.body[0].tasks).toEqual(tasks);
  expect(response.body[0].students).toEqual(students);
  expect(Object.keys(response.body[0]).sort()).toEqual(body_keys.sort());
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
