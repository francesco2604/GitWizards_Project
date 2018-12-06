var TaskgroupRepository = require('../repositories/taskgroup.repository.js');
var taskgroupsList = TaskgroupRepository.getList();
//taskgroupList = [];
//id_increment = 0;


function getTaskgroupAll(userid)
{
	//taskgroups = [{'id':123456,'description':'domande di storia'},{'id':123457,'description':'domande di geografia'}];		//questo sarà poi preso dall' archivio
	console.log('ciao');
	return TaskgroupRepository.getList();
}

function postTaskgroup(desc)
{
	if (desc !== null && desc !== undefined && desc.trim() != "")
	{
		var index = TaskgroupRepository.addTg(desc);
		var tg = TaskgroupRepository.getTg(index);
		//console.log(tg);
		return tg;
		//console.log("Creata risorsa ");
	}
	else
	{
		return null;
	}
}

function getTaskgroup(id)
{
	index = -1
	return TaskgroupRepository.getTg(id)
}

function putTaskgroup(id,desc,tasks)
{
	index = -1
	tg = TaskgroupRepository.getTg(id);
	//cerco la taskgroup
	for(i = 0; i < taskgroupsList.length; i++)
	{
		if (taskgroupsList[i].id == id)
		{
			tg = taskgroupsList[i];
			index = i;
		}
	}
	if (index===-1)
	{
		 return null;
	}
	else
	{		
		TaskgroupRepository.modifyTg(index,desc,tasks);
		console.log("Modificata risorsa "+index);
		return tg;
	}
}

function deleteTaskgroup(id)
{
	index = -1
	tg = null;

	for(i = 0; i < taskgroupsList.length; i++)
	{
		if (taskgroupsList[i].id == id)
		{
			tg = taskgroupsList[i];
			index = i;
		}
	}
	//console.log(index);
	if (index===-1)
	{
		 return 0;
	}
	else
	{
		TaskgroupRepository.deleteTg(index);
		console.log("Eliminata risorsa " + (index+1));
		return 1;
	}
}

module.exports = {getTaskgroupAll,postTaskgroup,getTaskgroup,putTaskgroup,deleteTaskgroup}
