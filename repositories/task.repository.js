'use strict'

// === IMPORTS =====
var Task = require('../models/task.model');


class TaskRepository {
  //(id, question, type, answers, correct_answer, student_answer)
    constructor() {
        this._tasks = [
                        //(id, question,                                    type,     answers, correct_answer, student_answer)
            (new Task(1, 'Quanti anni aveva napoleone alla sua morte?', Task.TASK_TYPE.SINGLE_ANSWER , ['48','44','12'],'2', '1')).toJSON(),
            (new Task(2, 'Quanti anni aveva napoleone alla sua nascita?', Task.TASK_TYPE.SINGLE_ANSWER ,['0','1','9 mesi'], '1', '2')).toJSON(),
            (new Task(3, 'Descrivi la teroia della gravitazionalità', Task.TASK_TYPE.OPEN,[], '', 'é una teoria  molto importantezionale')).toJSON(),
            (new Task(4, 'Quale di questi è un gas nobile', Task.TASK_TYPE.MULTIPLE_ANSWER,['helio','neon','burundi'], '0,2', '1,2' )).toJSON(),
            (new Task(5, 'tu sei un..', Task.TASK_TYPE.MULTIPLE_ANSWER,['essere carnivoro ','essere vegetariano','Mangia sassi '], '0,1', '1,2')).toJSON(),
        ];
    }

    createNewTask(task_obj) {
        var new_id = this._tasks.size + 1;
        user_obj.id = new_id;
        this._users.set(new_id, task_obj);
        return new_id;
    }

    getTaskById(task_id){
        var length = this._tasks.length;
        for (var i = 0 ; i < length ; i ++){
            if(this._tasks[i].id === task_id){
                return this._tasks[i];
            }
        }
        return 'No Result';
    }

    deleteTsk(index){
        this._tasks.splice(index,1)
    }

    addTsk(task){
        this._tasks.push(task)
    }

}

// ====== INIT AND EXPORT =========
var taskRepository  = new TaskRepository();
module.exports = taskRepository;
