taskgroupList = [];
id_increment = 0;
error404 = {"codice":404,"messaggio":"Risorsa non trovata"}
error400 = {"codice":400,"messaggio":"Richiesta mal formattata"}
error403 = {"codice":403,"messaggio":"Non si hanno i permessi necessari"}
users = [{"id":1,"firstname":"Daniele","lastname":"Francescatti","email":"daniele.francescatti@gmail.com","type":"Teacher","identification_number":"180514"},{"id": 2,"firstname": "Luca","lastname": "Giorgini","email": "luca.giorgini@example.com","type": "Student","identification_number": 890123}]

function getTaskgroupAll(req,res)
{
	userid = req.headers['user_id'];
	console.log(userid);
	if(getUserRole(userid) != "Teacher" && getUserRole(userid) != "Student&Teacher")
	{
		res.status(403).json(error403);
	}
	else
	{
		//taskgroups = [{'id':123456,'description':'domande di storia'},{'id':123457,'description':'domande di geografia'}];		//questo sarà poi preso dall' archivio
		res.status(200).json(taskgroupList);
	}
}

function postTaskgroup(req,res)
{
	userid = req.headers['user_id'];
	if(getUserRole(userid) != "Teacher" && getUserRole(userid) != "Student&Teacher")
	{
		res.status(403).json(error403);
	}
	else
	{
		const taskgroup_name = req.body.description

		//QUESTO CONTROLLO NON FUNZIONA, NON CAGATELO
		if (taskgroup_name !== null && taskgroup_name !== undefined && taskgroup_name.trim() != "")
		{
				id_increment++;
				const tg =  {"id":id_increment,"description":taskgroup_name}
				taskgroupList.push(tg)
				res.status(201).json(tg)
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
	if(getUserRole(userid) != "Teacher" && getUserRole(userid) != "Student&Teacher")
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
		console.log(index);
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
	id = req.params.id;
}

function deleteTaskgroup(req,res)
{
	id = req.params.id;
}


// estrapola il ruolo tramite l' id utente
function getUserRole(id)
{
	role = "Unlogged"

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
