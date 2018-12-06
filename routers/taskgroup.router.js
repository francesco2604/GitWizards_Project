const express = require('express');
var functions = require('../controllers/taskgroup.controller.js');

var Error = require('../models/error.model.js');
var User = require('../models/user.model.js');
var users = require('../repositories/user.repository.js');

var router = express.Router();

//users = [{"id":1,"firstname":"Daniele","lastname":"Francescatti","email":"daniele.francescatti@gmail.com","type":2,"identification_number":"180514"},{"id": 2,"firstname": "Luca","lastname": "Giorgini","email": "luca.giorgini@example.com","type": 1,"identification_number": 890123}]
error403 = new Error(403,"Non si hanno i permessi necessari");
error404 = new Error(404,"Risorsa non trovata");
error400 = new Error(400,"Richiesta mal formattata");

router.get('/', (req,res) => 
{
	var userid = req.headers['user_id']
	var role = users.getUserRoleByUserId(parseInt(userid));
	//console.log(role);
	if(role !== 2 && role !== 3)
	{
		res.status(error403.code).json(error403);
	}
	else
	{
		var response = functions.getTaskgroupAll();
		res.status(200).json(response);
	}

});

router.post('/', (req, res) => 
{
	var userid = req.headers['user_id']
	var role = users.getUserRoleByUserId(parseInt(userid));
	if(role !== 2 && role !== 3)
	{
		res.status(error403.code).json(error403);
	}
	else
	{
		var response = functions.postTaskgroup(req.body.description);
		console.log(response);
		if(response !== null)
		{
			res.status(201).json(response)
		}
		else
		{
			res.status(error400.code).json(error400);
		}
	}
    
})

router.get('/:id', (req,res) => 
{
	var userid = req.headers['user_id']
	var role = users.getUserRoleByUserId(parseInt(userid));
	if(role !== 2 && role !== 3)
	{
		res.status(error403.code).json(error403);
	}
	else
	{
		var response = functions.getTaskgroup(req.params.id);
		
		if(response !== null)
		{
			res.status(200).json(response);
		}
		else
		{
			res.status(error404.code).json(error404);
		}
	}
	
});

router.put('/:id', (req,res) => 
{
	var userid = req.headers['user_id']
	var role = users.getUserRoleByUserId(parseInt(userid));
	if(role !== 2 && role !== 3)
	{
		res.status(error403.code).json(error403);
	}
	else
	{
		if(req.body.id !== null && req.body.id !== undefined && req.body.description && req.body.description !== null && req.body.description !== undefined && req.body.tasks !== undefined)
		{
			var response = functions.putTaskgroup(req.params.id,req.body.description,req.body.tasks);
			//console.log(response);
			if(response !== null)
			{
				res.status(200).json(response);
			}
			else
			{
				res.status(error404.code).json(error404);
			}
		}
		else
		{
			res.status(error400.code).json(error400);
		}
	}
	
});

router.delete('/:id', (req,res) => 
{
	var userid = req.headers['user_id']
	var role = users.getUserRoleByUserId(parseInt(userid));
	if(role !== 2 && role !== 3)
	{
		res.status(error403.code).json(error403);
	}
	else
	{
		var result = functions.deleteTaskgroup(req.params.id);
		if(result === 1)
		{
			res.status(204).send("Cancellazione avvenuta con successo");
		}
		else
		{
			res.status(error404.code).json(error404);
		}
	}
	
});

function inputTgId(a)
{
	return a
}

/*
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
*/
module.exports = router
