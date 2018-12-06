var TaskgroupRepository = require('../repositories/taskgroup.repository.js');
var taskgroupRepositories=(new TaskgroupRepository())
var taskgroupsList= taskgroupRepositories.getList();
//taskgroupList = [];
//id_increment = 0;
error404 = {"codice":404,"messaggio":"Risorsa non trovata"}
error400 = {"codice":400,"messaggio":"Richiesta mal formattata"}


function getTaskgroupAll(userid)
{
	//taskgroups = [{'id':123456,'description':'domande di storia'},{'id':123457,'description':'domande di geografia'}];		//questo sarà poi preso dall' archivio
	return taskgroupsList;
}

function postTaskgroup(desc)
{
	if (desc !== null && desc !== undefined && desc.trim() != "")
	{
		var tg =  {"id":0,"description":desc,"tasks":[]}
		taskgroupRepositories.addTg(tg);
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
		 return null;
	}
	else
	{
		return tg;
	}
}

function putTaskgroup(id,desc,tasks)
{
	index = -1
	tg = null;
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
		var tg =  {"id":id,"description":desc,"tasks":tasks}
		
		taskgroupRepositories.modifyTg(index,tg);
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
		taskgroupRepositories.deleteTg(index);
		console.log("Eliminata risorsa " + (index+1));
		return 1;
	}
}

module.exports = {getTaskgroupAll,postTaskgroup,getTaskgroup,putTaskgroup,deleteTaskgroup}
