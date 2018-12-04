
var ExamRepository = require('../repositories/exam.repositories.js');
var examRepositories=(new ExamRepository())
var examList= examRepositories.getList();
var propertiesForUpdate = ['description', 'numerotasks'];
var idSequence = 1000;
function getExamsList()
{
  return examRepositories.getList();
}
function postExams(exam_post, identity)
{
  if((exam_post['teacher'])['id']!=identity.user_id || identity.user_role!= 2)
  return 'No permission'
  else {
        if(exam_post.description === undefined || exam_post.numerotasks=== undefined)
        return 'Error'
        idSequence++;
        exam_post.id = idSequence
        examList.push(exam_post)
        examRepositories.updateList(examList)
        return exam_post
  }
}
module.exports = {getExamsList,postExams}
