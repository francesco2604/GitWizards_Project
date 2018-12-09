/* Example variables */
var UserRep = require('../repositories/user.repository.js');
var TaskRer = require('../repositories/task.repository.js');
var Exam = require('../repositories/exam.repositories.js');
const tasks = [ TaskRer.getTaskById(1),TaskRer.getTaskById(2)];
//var tasks = [task];
const exams=[Exam.getExamForId(2)];
var peerReview = {
  id: 0,
  examid: 1,
  task: tasks,
  studentanswer: 3,
  mark: 30,
  description: 'The task is perfect as it is',
  deadline: 900
}
var peerReviews = [peerReview];
module.exports = { peerReviews, exams };
