
var ExamRepository = require('../repositories/exam.repositories.js');
var examRepositories=(new ExamRepository())
var examList= examRepositories.getList();
var propertiesForUpdate = ['description', 'numerotasks'];
var idSequence = 1000;
//GET EXAMS LIST FOR STUDENT AND TEACHER
function getExamsList()
{
  return examRepositories.getList();
}

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
function putExamsById(id, propertiesChanged, identity) {
  if(id === undefined || identity === undefined)
  return 'Error'
  if(parseInt(identity.user_role)!= 2)
     return 'No permission'
  if (propertiesChanged === undefined)
      return 'Not Found'
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
