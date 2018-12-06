'use strict'
var Taskgroup = require('../models/taskgroup.model.js');
var Task = require('../models/task.model.js');
var User = require('../models/user.model.js');

var tasks = require('../repositories/task.repository.js');

var tasks1 = [tasks.getTaskById(1)];
var tasks2 = [tasks.getTaskById(2)];


class TaskgroupRepository
{
	
	constructor()
	{
		this._taskgroups=[(new Taskgroup(1,'tgprova1',tasks1)),
			(new Taskgroup(2, 'tgprova2', tasks2))];
		
		//this._taskgroups=['ciao']
		this._id_increment = 2;
	}
	//getTgForId(index){return this.taskgroups[index]}
	getList()
	{
		return this._taskgroups
	}
	deleteTg(index)
	{
		this._taskgroups.splice(index,1)
	}
	addTg(desc)
	{
		this._id_increment++;
		var index = this._id_increment;
		var tg = new Taskgroup(index,desc,[]);
		this._taskgroups.push(tg)
		return index;
	}
	getTg(id)
	{
		var tg = null;
		var index = -1;
		
		for(var i = 0; i < this._taskgroups.length; i++)
		{
			//console.log('sono qua');
			if (this._taskgroups[i].id == id)
			{
				tg = this._taskgroups[i];
				index = i;
			}
		}
		//console.log(index);
		if (index===-1)
		{
			return null;
		}
		else
		{
			return tg
		}
	}
	modifyTg(index,desc,tasks)
	{
		this._taskgroups[index].description = desc
		this._taskgroups[index].tasks = tasks
	}
}

var taskgroupRepository = new TaskgroupRepository();
module.exports = taskgroupRepository;
