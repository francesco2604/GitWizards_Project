var TaskgroupRepository = require('../repositories/taskgroup.repository.js');
var taskgroupRepositories=(new TaskgroupRepository())
var taskgroupsList= taskgroupRepositories.getList();
//taskgroupList = [];
//id_increment = 0;
error404 = {"codice":404,"messaggio":"Risorsa non trovata"}
error400 = {"codice":400,"messaggio":"Richiesta mal formattata"}
error403 = {"codice":403,"messaggio":"Non si hanno i permessi necessari"}
users = [{"id":1,"firstname":"Daniele","lastname":"Francescatti","email":"daniele.francescatti@gmail.com","type":2,"identification_number":"180514"},{"id": 2,"firstname": "Luca","lastname": "Giorgini","email": "luca.giorgini@example.com","type": 1,"identification_number": 890123}]

function getTaskgroupAll(req,res)
{
	userid = req.headers['user_id'];
	//console.log(userid);
	if(getUserRole(userid) != 2 && getUserRole(userid) != 3)
	{
		res.status(403).json(error403);
	}
	else
	{
		//taskgroups = [{'id':123456,'description':'domande di storia'},{'id':123457,'description':'domande di geografia'}];		//questo sarà poi preso dall' archivio
		res.status(200).json(taskgroupsList);
	}
}

function postTaskgroup(req,res)
{
	userid = req.headers['user_id'];
	if(getUserRole(userid) != 2 && getUserRole(userid) != 3)
	{
		res.status(403).json(error403);
	}
	else
	{
		var taskgroup_name = req.body.description

		if (taskgroup_name !== null && taskgroup_name !== undefined && taskgroup_name.trim() != "")
		{
			var tg =  {"id":0,"description":taskgroup_name,"tasks":[]}
			taskgroupRepositories.addTg(tg);
			res.status(201).json(tg)
			//console.log("Creata risorsa ");
		}
		else
		{
			res.status(400).json(error400);
		}
	}
}

function getTaskgroup(req,res)
{
	userid = req.headers['user_id'];
	if(getUserRole(userid) != 2 && getUserRole(userid) != 3)
	{
		res.status(403).json(error403);
	}
	else
	{
		id = req.params.id;
		index = -1
		tg = null;

		for(i = 0; i < taskgroupList.length; i++)
		{
			if (taskgroupList[i].id == id)
			{
				tg = taskgroupList[i];
				index = i;
			}
		}
		//console.log(index);
		if (index===-1)
		{
			 res.status(404).json(error404);
			 return
		}
		else
		{
			res.status(200).json(tg)
		}
	}
}

function putTaskgroup(req,res)
{
	userid = req.headers['user_id'];
	if(getUserRole(userid) != 2 && getUserRole(userid) != 3)
	{
		res.status(403).json(error403);
	}
	else
	{
		id = req.params.id;
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
			 res.status(404).json(error404);
			 return
		}
		else
		{
			var taskgroup_name = req.body.description
			var tasks = req.body.tasks
			var tg =  {"id":id,"description":taskgroup_name,"tasks":tasks}
			
			taskgroupRepositories.modifyTg(index,tg);
			res.status(200).json(tg);
			console.log("Modificata risorsa "+index);
		}
	}
}

function deleteTaskgroup(req,res)
{
	userid = req.headers['user_id'];
	if(getUserRole(userid) != 2 && getUserRole(userid) != 3)
	{
		res.status(403).json(error403);
	}
	else
	{
		id = req.params.id;
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
			 res.status(404).json(error404);
			 return
		}
		else
		{
			taskgroupRepositories.deleteTg(index);
			res.status(204).send("Risorsa eliminata con successo").end();
			console.log("Eliminata risorsa " + (index+1));
		}
	}
}


// estrapola il ruolo tramite l' id utente
function getUserRole(id)
{
	role = 0

	if(id > 0 && id !== undefined && id !== null)
	{
		for(i = 0; i < users.length; i++)
		{
			if (users[i].id == id)
			{
				role = users[i].type;
			}
		}
	}

	return role;
}

module.exports = {getTaskgroupAll,postTaskgroup,getTaskgroup,putTaskgroup,deleteTaskgroup}
