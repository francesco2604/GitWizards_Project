'use strict'
var Taskgroup = require('../models/taskgroup.model.js');
var User = require('../models/user.model.js');

var tasks1 = [{id: 123456,numeroDomanda: 2,question: 'diametro della Terra?',type: 1,answers: ['9.742 km','19.742 km','12.742 km'],correctAnswer: '3',studentAnswer: '1'},
{id: 85884,numeroDomanda: 2,question: 'diametro della Luna?',type: 1,answers: ['9.742 km','19.742 km','12.742 km'],correctAnswer: '3',studentAnswer: '1'}];
var tasks2 = [{id: 123457,numeroDomanda: 2,question: 'diametro di una mela?',type: 1,answers: ['9.742 km','19.742 km','12.742 km'],correctAnswer: '3',studentAnswer: '1'},
{id: 85885,numeroDomanda: 2,question: 'diametro di una palla da basket?',type: 1,answers: ['9.742 km','19.742 km','12.742 km'],correctAnswer: '3',studentAnswer: '1'}];
var tasks3 = [{id: 123458,numeroDomanda: 2,question: 'diametro di Giove?',type: 1,answers: ['9.742 km','19.742 km','12.742 km'],correctAnswer: '3',studentAnswer: '1'},
{id: 85886,numeroDomanda: 2,question: 'diametro di Saturno?',type: 1,answers: ['9.742 km','19.742 km','12.742 km'],correctAnswer: '3',studentAnswer: '1'}];

var id_increment;

var taskgroups=[];
var teacher = new User(32,'mario','rossi','prova@gmail.com',User.USER_TYPE.TEACHER,123456)
var students = [new User(89,'francesco','persi','prova@gmail.com',User.USER_TYPE.STUDENT,1875698),
                new User(23,'paolo','persi','prova@gmail.com',User.USER_TYPE.STUDENT,187546)];
class TaskgroupRepository
{
	constructor()
	{
		this.taskgroups=[(new Taskgroup(1,'tgprova1',tasks1)).toJSON(),
			(new Taskgroup(2, 'tgprova2', tasks2)).toJSON(),
			(new Taskgroup(3, 'tgprova3', tasks3)).toJSON()];
			
		id_increment = 3;
	}
	//getTgForId(index){return this.taskgroups[index]}
	getList(){return this.taskgroups}
	deleteTg(index){this.taskgroups.splice(index,1)}
	addTg(taskgroup)
	{
		id_increment++;
		taskgroup.id = id_increment;
		this.taskgroups.push(taskgroup)
	}
	modifyTg(indexold,newtg){this.taskgroups[indexold]=newtg;}
}
module.exports = TaskgroupRepository;
