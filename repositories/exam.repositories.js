'use strict'
var Exam = require('../models/exams.object.js');
var User = require('../models/user.model.js');
var Task = require('../models/task.model.js');
const tasks = [new Task(123456, 'diametro della Terra?', 1, ['9.742 km','19.742 km','12.742 km'],'3','1'),
              new Task(85884, 'diametro della Terra?', 1, ['9.742 km','19.742 km','12.742 km'],'3', '1')];

var exams=[];
var teacher = new User(32,'mario','rossi','prova@gmail.com',User.USER_TYPE.TEACHER,123456)
var students = [new User(89,'francesco','persi','prova@gmail.com',User.USER_TYPE.STUDENT,1875698),
                new User(23,'paolo','persi','prova@gmail.com',User.USER_TYPE.STUDENT,187546)];
class ExamRepository
{

     constructor()
     {
       this.exams=[(new Exam(2,'prova2',3600, 2,teacher,tasks, students)).toJSON(),
       (new Exam(3, 'prova3', 3600, 2,teacher, tasks,students)).toJSON(),
       (new Exam(4, 'prova4', 3600, 2,teacher, tasks,students)).toJSON(),
       (new Exam(5, 'prova5', 3600, 2,teacher, tasks,students)).toJSON(),
       (new Exam(6, 'prova6', 3600, 2,teacher, tasks,students)).toJSON(),
       (new Exam(7, 'prova7', 3600, 2,teacher, tasks,students)).toJSON(),
       (new Exam(8, 'prova8', 3600, 2,teacher, tasks,students)).toJSON()];
     }
   getExamForId(index){return this.exams[index]}
    getList(){return this.exams}
    deleteEx(index){this.exams.splice(index,1)}
    addEx(exams){this.exams.push(exams)}
    updateList(newlist){this.exams=newlist;}
}
module.exports = ExamRepository;
