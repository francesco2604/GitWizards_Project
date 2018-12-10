var TaskRepository = require('../repositories/task.repository.js');
var taskRepositories = TaskRepository.taskRepository;
var propertiesForUpdate = ['_id', '_question', '_type', '_answers', '_correct_answer', '_student_answer'];
var idSequence = 1000;

// GET ID FUNCTION
function getTaskById(id)
{
    const task = TaskRepository.getTaskById(id)
    if (task === undefined)
        return 'Not Found'
    try {
        return task
    }
    catch (error) {
        return 'ErrorCatch'
    }
}
//POST FUNCTION
function postTasks(task_post)
{
    if( task_post ==undefined || task_post._question === undefined || task_post._type === undefined)
        return 'Error'
    idSequence++;
    task_post._id = idSequence
    TaskRepository.addTsk(task_post)
    return task_post;
}
//PUT FUNCTION
function putTaskById(taskid, task, identity) {
    if(parseInt(identity['user_role']) != 2)
    {
        return 'No permission'
    }

    var taskFromDB = getTaskById(taskid);
    if(taskFromDB == 'Not Found'){
        return 'Not Found'
    }
    else {
        if(taskFromDB === 'Error')
            return taskFromDB
        else
        {
            for(let p of propertiesForUpdate) {
                let value = task[p];
                if(taskFromDB[p]!= value){
                    taskFromDB[p] = value;
                }
            }
            //console.log(taskFromDB)
            TaskRepository.deleteTsk(taskid)
            //deleteTaskById(taskid,identity)
            TaskRepository.addTsk(taskFromDB)
            return taskFromDB
        }

    }
}
//DELETE FUNCTION
function deleteTaskById(id,identity)
{
    if( parseInt(identity.user_role)!= 2)
        return 'No permission'
    const task = getTaskById(id);
    //console.log(task);
    if (task === undefined)
        return 'Not Found'
    try {
        return TaskRepository.deleteTsk(id);
    }
    catch (error) {
        return TaskRepository.deleteTsk(id);
    }
}
module.exports = {getTaskById,postTasks,deleteTaskById,putTaskById}
