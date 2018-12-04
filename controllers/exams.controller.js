
var ExamRepository = require('../repositories/exam.repositories.js');
var examRepositories=(new ExamRepository())
var examList= examRepositories.getList();
var propertiesForUpdate = ['description', 'numerotasks'];
var idSequence = 1000;
function getExamsList()
{
  return examRepositories.getList();
  //	res.status(200).json(examList);
}
module.exports = {getExamsList}
