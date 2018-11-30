const express = require('express');
var functions = require('../controllers/taskgroup.controller.js');

var router = express.Router();

router.get('/', async (req,res) => {
	functions.getTaskgroupAll(req,res);
});

router.post('/', (req, res) => {
    functions.postTaskgroup(req,res);
})

router.get('/:id',async (req,res) => {
	functions.getTaskgroup(req,res);
});

router.put('/:id',async (req,res) => {
	functions.putTaskgroup(req,res);
});

router.delete('/:id',async (req,res) => {
	functions.putTaskgroup(req,res);
});

function inputTgId(a)
{
	return a
}

module.exports = router
