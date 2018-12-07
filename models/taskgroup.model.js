'use strict'
class Taskgroup
{
	constructor(id,description,tasks)
	{
		this.id=id;
		this.description=description;
		this.tasks=tasks;
	}

	get idGet()
	{
		return this.id;
	}

	get descriptionGet()
	{
		return this.description;
	}
	
	set descriptionSet(des)
	{
		description = des;
	}

	get  tasksGet()
	{
		return this.tasks;
	}
	
	set taskAdd(tsk)
	{
		tasks.push(tsk);
	}

	set taskDelete(idtsk)
	{
		for(i = 0; i < tasks.length; i++)
		{
			if (tasks[i].id == idtsk)
			{
				index = i;
			}
		}
		
		tasks.splice(index,1);
	}
	
	toJSON()
	{
		return ({
		  id: this.id,
		  description: this.description,
		  tasks: this.tasks
		 });
	}
}

module.exports = Taskgroup;
