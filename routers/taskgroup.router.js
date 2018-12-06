const express = require('express');
var functions = require('../controllers/taskgroup.controller.js');

var router = express.Router();

users = [{"id":1,"firstname":"Daniele","lastname":"Francescatti","email":"daniele.francescatti@gmail.com","type":2,"identification_number":"180514"},{"id": 2,"firstname": "Luca","lastname": "Giorgini","email": "luca.giorgini@example.com","type": 1,"identification_number": 890123}]
error403 = {"codice":403,"messaggio":"Non si hanno i permessi necessari"}
error404 = {"codice":404,"messaggio":"Risorsa non trovata"}
error400 = {"codice":400,"messaggio":"Richiesta mal formattata"}

router.get('/', async (req,res) => 
{
	userid = req.headers['user_id']
	role = getUserRole(userid);
	if(role !== 2 && role !== 3)
	{
		res.status(403).send(error403);
	}
	else
	{
		response = functions.getTaskgroupAll();
		res.status(200).json(response);
	}

});

router.post('/', (req, res) => 
{
	userid = req.headers['user_id']
	role = getUserRole(userid);
	if(role !== 2 && role !== 3)
	{
		res.status(403).send(error403);
	}
	else
	{
		response = functions.postTaskgroup(req.body.description);
		
		if(response !== null)
		{
			res.status(201).json(response)
		}
		else
		{
			res.status(400).json(error400);
		}
	}
    
})

router.get('/:id',async (req,res) => 
{
	userid = req.headers['user_id']
	role = getUserRole(userid);
	if(role !== 2 && role !== 3)
	{
		res.status(403).send(error403);
	}
	else
	{
		response = functions.getTaskgroup(req.params.id);
		
		if(response !== null)
		{
			res.status(200).json(response);
		}
		else
		{
			res.status(404).json(error404);
		}
	}
	
});

router.put('/:id',async (req,res) => 
{
	userid = req.headers['user_id']
	role = getUserRole(userid);
	if(role !== 2 && role !== 3)
	{
		res.status(403).send(error403);
	}
	else
	{
		response = functions.putTaskgroup(req.params.id,req.body.description,req.body.tasks);
		
		if(response !== null)
		{
			res.status(200).json(response);
		}
		else
		{
			res.status(404).json(error404);
		}
	}
	
});

router.delete('/:id',async (req,res) => 
{
	userid = req.headers['user_id']
	role = getUserRole(userid);
	if(role !== 2 && role !== 3)
	{
		res.status(403).send(error403);
	}
	else
	{
		result = functions.deleteTaskgroup(req.params.id);
		if(result === 1)
		{
			res.status(200).send("Cancellazione avvenuta con successo");
		}
		else
		{
			res.status(404).send(error404);
		}
	}
	
});

function inputTgId(a)
{
	return a
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

module.exports = router
