/* Example variables */
var UserRep = require('../repositories/user.repository.js');
var TaskRer = require('../repositories/task.repository.js');
var Exam = require('../repositories/exam.repositories.js');

var task = TaskRer.getTaskById(2)

var exam = Exam.getExamForId(2)
var exampleError = "123";

module.exports = {task, exam, exampleError };
