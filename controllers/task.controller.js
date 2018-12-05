taskList = [];
id_increment = 0;
error404 = {"codice":404,"messaggio":"Risorsa non trovata"}
error400 = {"codice":400,"messaggio":"Richiesta mal formattata"}
error403 = {"codice":403,"messaggio":"Non si hanno i permessi necessari"}
users = [{"id":1,"firstname":"Daniele","lastname":"Francescatti","email":"daniele.francescatti@gmail.com","type":2,"identification_number":"180514"},{"id": 2,"firstname": "Luca","lastname": "Giorgini","email": "luca.giorgini@example.com","type": 1,"identification_number": 890123}]


function postTask(req,res)
{
	userid = req.headers['user_id'];
	if(getUserRole(userid) != 2 && getUserRole(userid) != 3)
	{
		res.status(403).json(error403);
	}
	else
	{
		const task_name = req.body.description

		if (task_name !== null && task_name !== undefined && task_name.trim() != "")
		{
				id_increment++;
				const tsk =  {"id":id_increment,"question":task_name}
				taskList.push(tsk)
				res.status(201).json(tsk)
				console.log("Creata risorsa " + id_increment);
		}
		else
		{
				res.status(400).json(error400);
		}
	}
}
//get task
function getTask(req,res)
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
		tsk = null;

		for(i = 0; i < taskList.length; i++)
		{
			if (taskList[i].id == id)
			{
				tsk = taskList[i];
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
			res.status(200).json(tsk)
		}
	}
}

function putTask(req,res)
{
	id = req.params.id;
}

function deleteTask(req,res)
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
		tsk = null;

		for(i = 0; i < taskList.length; i++)
		{
			if (taskList[i].id == id)
			{
				tsk = taskList[i];
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
			taskList.splice(index,1);
			res.status(204).send("Risorsa eliminata con successo").end();
			console.log("Eliminata risorsa " + (index+1));
		}
	}
}


// estrapola il ruolo tramite l' id utente
function getUserRole(id)
{
	// 0 = unlogged
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

//module.exports = {postTask,getTask,putTask,deleteTask}
module.exports = {postTask}
