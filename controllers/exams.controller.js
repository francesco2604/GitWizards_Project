
var ExamRepository = require('../repositories/exam.repositories.js');
var examRepositories=ExamRepository;          // DA CAMBIARE: è già un'istanza
var examList= examRepositories.getList();
var propertiesForUpdate = ['description', 'numerotasks'];
var idSequence = 1000;
//GET EXAMS LIST FOR STUDENT AND TEACHER
function getExamsList()
{
  return examRepositories.getList();
}

// GET ID FUNCTION 
function getExamsById(id)
{
  const index = (getExamsList()).findIndex((item)=> {return item.id===id})
  if (index===-1)
  return 'Not Found'
  try {
    return examRepositories.getExamForId(index)
  }
  catch (error) {
    return 'ErrorCatch'
  }
}
//POST FUNCTION
function postExams(exam_post, identity)
{
  if(exam_post.description === undefined || exam_post.numerotasks=== undefined)
  return 'Error'
  idSequence++;
  exam_post.id = idSequence
  examList.push(exam_post)
  examRepositories.updateList(examList)
  return exam_post
}
//PUT FUNCTION
function putExamsById(id, propertiesChanged, identity) {
  if(parseInt(identity.user_role)!= 2)
  return 'No permission'
  var examFromDB = getExamsById(id);
  if(examFromDB=='Not Found')
  return 'Not Found'
  else {

    if(((examFromDB['teacher'])['id'])!= parseInt(identity.user_id ))
    return 'No permission'
    else {
      if(examFromDB === 'Error')
      return examFromDB
      else
      {

        for(let p of propertiesForUpdate) {
          let value = propertiesChanged[p];
          if(examFromDB[p]!= value){
            examFromDB[p] = value;
          }
        }
        deleteExamsById(id,identity)
        examRepositories.addEx(examFromDB)
        return examFromDB
      }
    }
  }
}
//DELETE FUNCTION
function deleteExamsById(id,identity)
{

  if( parseInt(identity.user_role)!= 2)
  return 'No permission'
  const index = (getExamsList()).findIndex((item)=> {return item.id===id})
  if(index===-1)
  return 'Not Found'
  else{
    if(((examRepositories.getExamForId(index))['teacher'])['id']!=parseInt(identity.user_id))
    return 'No permission'
    else {
      examRepositories.deleteEx(index)
      return getExamsList();
    }
  }
}
module.exports = {getExamsList,getExamsById,postExams,deleteExamsById,putExamsById}
