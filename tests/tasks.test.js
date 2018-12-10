const request = require('supertest');
const server  = require('../app');
var Task = require('../models/task.model.js');
var router = require('../routers/task.router.js');
var functions = require('../controllers/tasks.controller.js');
var TaskRepository = require('../repositories/task.repository.js');
const tasks = [{_id: 1,_question: 'Quanti anni aveva napoleone alla sua morte?',_type: 1,_answers: ['48','44','12'],_correct_answer: '2',_student_answer: '1'},
    {id: 2,question: 'Quanti anni aveva napoleone alla sua nascita?',type: 1, answers: ['0','1','9 mesi'],correct_answer: '1',student_answer: '2'}];
var valid_task={
"task": {
"_id": 1,
"_question": "Quanti anni aveva napoleone alla sua morte?",
"_type": 1,
"_answers": [],
"_correct_answer": "2",
"_student_answer": "1"}
}
//TEEST FOR GET AN TASK FOR STUDENT
test("response 200 for a valid id task from list", async function () {
    var response = await request(server).get('/v1/task/?task_id=2').set('content-type', 'application/json').set('accept', 'application/json').set('user_id','2').set('user_role', '2' );
    expect(response.status).toBe(200);
});


test(" response 404 for a non existing task", async function () {
    var response = await request(server).get('/v1/task/?task_id=877').set('content-type', 'application/json').set('accept', 'application/json').set('user_id','2').set('user_role', '2' );
    expect(response.status).toBe(404);
});

test(" response 400 for get a invalid  task id", async function () {
    var response = await request(server).get('/v1/task/ethjy').set('content-type', 'application/json').set('accept', 'application/json').set('user_id','2').set('user_role', '2' );
    expect(response.status).toBe(400);
});

test("validate response to get a task by id ", async function () {
    var response = await request(server).get('/v1/task/?task_id=2').set('content-type', 'application/json').set('accept', 'application/json').set('user_id','2').set('user_role', '2' );
    var task = response.body;
    expect(response.body.id).toBeDefined();
    expect(response.body.question).toBeDefined();
    expect(response.body.type).toBeDefined();
    expect(response.body.answers).toBeDefined();
    expect(response.body.correct_answer).toBeDefined();
    expect(response.body.student_answer).toBeDefined();
});

//TEST FOR POST
test(" response 200 for post a valkid  task with a valid  user id ", async function () {
    var response = await request(server).post('/v1/task/').send(new Task(1, 'Quanti anni aveva napoleone alla sua morte?', 1, ['48','44','12'], '2', '1')).set('user_id','3').set('user_role','2').set('content-type', 'application/json').set('accept', 'application/json');
    expect(response.status).toBe(200);
});

test(" response 200 to post a Task with valid user role and valid user_role", async function () {
    var response = await request(server).post('/v1/task/').send(tasks[0]).set('user_id','3').set('user_role','2').set('content-type', 'application/json').set('accept', 'application/json');
    expect(response.status).toBe(200);
});
test("validate response for post a exam", async function () {
    var response = await request(server).post('/v1/task/').send(valid_task).set('user_id','3').set('user_role','2').set('content-type', 'application/json').set('accept', 'application/json');
    expect(response.status).toBe(200);
});
//TEST FOR PUT
test(" response 400 for put a exam  from list id", async function () {
    var response = await request(server).put('/v1/task/2').send(new Task(2, 'Quanti anni aveva napoleone alla sua morte?', 1, ['48','44','12'], '2', '1')).set('user_id','3').set('user_role','2').set('content-type', 'application/json').set('accept', 'application/json');
    expect(response.status).toBe(400);
});
test(" response 400 to put a task invalid role", async function () {

    var response = await request(server).put('/v1/task/2').send(new Task(2, 'Quanti anni aveva napoleone alla sua morte?', 1, ['48','44','12'], '2', '1')).set('user_id','3').set('user_role','2').set('content-type', 'application/json').set('accept', 'application/json');

    expect(response.status).toBe(400);
});
test(" response 400 for task with invalid id  ", async function () {

    var response = await request(server).put('/v1/task/2').send(new Task(2, 'Quanti anni aveva napoleone alla sua morte?', 1, ['48','44','12'], '2', '1')).set('user_id','3').set('user_role','2').set('content-type', 'application/json').set('accept', 'application/json');

    expect(response.status).toBe(400);
});
test(" response 404 for put a exam  from list ", async function () {

    var response = await request(server).put('/v1/task/2').send(new Task(2, 'Quanti anni aveva napoleone alla sua morte?', 1, ['48','44','12'], '2', '1')).set('user_id','3').set('user_role','2').set('content-type', 'application/json').set('accept', 'application/json');
    expect(response.status).toBe(400);
});


//TEST FOR DELETE
test(" response 400 to delete an inexiting task", async function () {


    var response = await request(server).delete('/v1/task/88558').set('user_id','2').set('user_role','2').set('content-type', 'application/json').set('accept', 'application/json');
    expect(response.status).toBe(400);

});

test(" response 400 to delete a task with invalid id", async function () {

    var response = await request(server).delete('/v1/task/88558').set('user_id','2').set('user_role','2').set('content-type', 'application/json').set('accept', 'application/json');
    expect(response.status).toBe(400);

});
test(" response 400 to delelte a task with invalid idid", async function () {
    var response = await request(server).delete('/v1/task/sdjkjs').set('user_id','2').set('user_role','2').set('content-type', 'application/json').set('accept', 'application/json');
    expect(response.status).toBe(400);

});
test(" response 400 for delete a task no role", async function () {

    var response = await request(server).delete('/v1/task/558').set('user_id','2').set('user_role','2').set('content-type', 'application/json').set('accept', 'application/json');
    expect(response.status).toBe(400);

});
test(" response 200 for delete a exam", async function () {

    var response = await request(server).delete('/v1/task/?taskid=2').set('user_id','2').set('user_role','2').set('content-type', 'application/json').set('accept', 'application/json');
    expect(response.status).toBe(200);

});/*
*/
// close server
afterAll(() => {
    server.close();
});
