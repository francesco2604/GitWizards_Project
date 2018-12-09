'use strict'
var Exam = require('../models/exams.object.js');
var UserRep = require('../repositories/user.repository.js');
//var User = require('../models/user.model.js');
var Task = require('../repositories/task.repository.js');
const tasks = [ Task.getTaskById(1),Task.getTaskById(2)];
var exams=[];
var teacher = UserRep.getUserById(2)
var students = [UserRep.getUserById(1)];
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
module.exports = new ExamRepository;
