const express = require('express');
var functions = require('../controllers/exams.controller.js');
var router = express.Router();

const result400 = {status: 400, body: {code: 400, message: "Bad Request"}};
const result401 = {status: 401, body: {code: 401, message: "Unauthorized, missing or invalid API Key"}};
const result404 = {status: 404, body: {code: 404, message: "Not Found"}};
const result200 = {status: 200, body: {code: 200, message: "Good response"}};
router.get('/', async (req,res) => {
	var examList = functions.getExamsList();
	res.json(examList);
});

router.post('/', (req, res) => {
    functions.postExams(req,res);
})

router.get('/:id',async (req,res) => {
	var id = parseInt(req.params.id);
	var exam = functions.getExamsById(id);
});

router.put('/:id',async (req,res) => {
	var propertiesChanged = req.body;

	functions.putExamsById(id, propertiesChanged);
});

router.delete('/:id',async (req,res) => {
	functions.deleteExamsById(req,res);
});

module.exports = router
