'use strict'
var Exam = require('../models/exams.object.js');
const tasks = [{id: 123456,numeroDomanda: 2,question: 'diametro della Terra?',type: 1,answers: ['9.742 km','19.742 km','12.742 km'],correctAnswer: '3',studentAnswer: '1'},
{id: 85884,numeroDomanda: 2,question: 'diametro della Terra?',type: 1,answers: ['9.742 km','19.742 km','12.742 km'],correctAnswer: '3',studentAnswer: '1'}];

var exams=[];
var teacher ={id:32,firstname: 'mario',lastname: 'rossi',email: 'prova@gmail.com',type: 1,identification_number:123456 };
var students = [{id:89,firstname: 'francesco ',lastname: 'persi',email: 'prova@gmail.com',type: 0,identification_number:1875698 },
{id:85,firstname: 'carlo',lastname: 'conti',email: 'prova@gmail.com',type: 0,identification_number:187525 }];
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
