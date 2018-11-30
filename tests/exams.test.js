
const request = require('supertest');
const server  = require('../app');


const exams = require('./../controllers/exams.controller.js');


const task_prova = {id: 123456,numeroDomanda: 2,question: 'diametro della Terra?',type: 1,answers: ['9.742 km','19.742 km','12.742 km'],correctAnswer: '3',studentAnswer: '1'};

var user ={id:32,firstname: 'mario',lastname: 'rossi',email: 'prova@gmail.com',type: 'Teacher',identification_number:123456 };

var exam_prova= {ex_id: 158898,description: 'prova',deadline: 3600,numerotasks: 2,user,task_prova	};
//test for get exam list

test("metod get respons ok", async function () {
    var response = await request(server).get('/v1/exams/1');
    expect(response.status).toBe(200);
      //  expect(exams.getExamsList()).toEqual(exams.statusok);
});

test("validate selection 404 for get a exam  list ", async function () {

  var response = await request(server).get('/v1/exams/877');
  expect(response.status).toBe(404);
});

//use fetch 

/*test("validate response 404 for get a exam  list ", function () {

        expect(exams.getExamlist(token2, "created")).toEqual(exams.result404);
});
*/
/*test("validate response for get a exam  list ", function () {

        const body = exams.getExamlist().body;
        expect(body.length).toBeDefined();
        expect(body[0].id).toBeDefined();
        expect(body[0].owner).toBeDefined();
        expect(body[0].title).toBeDefined();
        expect(body[0].description).toBeDefined();
        expect(body[0].taskset).toBeDefined();
        expect(body[0].group).toBeDefined();
        expect(body[0].final_deadline).toBeDefined();
        expect(body[0].review_deadline).toBeDefined();

});*/
test("validate  for get by id  in a exam  list ", async function () {

  var response = await request(server).get('/v1/exams/1');
  var exam = response.body;
  //  response.get('content-type').toBeDefined()
  expect(response.body.id).toBeDefined();
  //expect((response.get('content-type').headers).description).toBeDefined();
});
//test for post a exam
test("validate response for post a exam", async function () {

        //expect(exams.postExam().toEqual(exams.statusok);
        var response = await request(server).post('/v1/exams/');
        expect(response.status).toBe(200);

});

test("invalidate post response for post a exam", async function () {

        //expect(exams.postExam().toEqual(exams.statusok);
        var response = await request(server).delete('/v1/exams/88558');
        expect(response.status).toBe(400);

});






/*test("validate response for get a exam", function () {


        let body = exams.getExam(token, 0).body;
        expect(body.id).toBeDefined();
        expect(body.owner).toBeDefined();
        expect(body.title).toBeDefined();
        expect(body.description).toBeDefined();
        expect(body.taskset).toBeDefined();
        expect(body.group).toBeDefined();
        expect(body.final_deadline).toBeDefined();
        expect(body.review_deadline).toBeDefined();


});*/



afterAll(() => {
    server.close();
});
