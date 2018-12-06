'use strict'

// === IMPORTS =====
var Task = require('../models/task.model');


class TaskRepository {
  //(id, question, type, answers, correct_answer, student_answer)
    constructor() {
        this._tasks = new Map([
                        //(id, question,                                    type,     answers, correct_answer, student_answer)
            [1, new Task(1, 'Quanti anni aveva napoleone alla sua morte?', Task.TASK_TYPE.SINGLE_ANSWER , [48,44,12],'2', '1')],
            [2, new Task(2, 'Quanti anni aveva napoleone alla sua nascita?', Task.TASK_TYPE.SINGLE_ANSWER ,[0,1,9], '1', '2')],
            [3, new Task(3, 'Descrivi la teroia della gravitazionalità', Task.TASK_TYPE.OPEN,[0,1,9], '', 'é una teoria  molto importantezionale')],
            [4, new Task(4, 'Quale di questi è un gas nobile', Task.TASK_TYPE.MULTIPLE_ANSWER,['helio','neon','burundi'], '0,2', '1,2' )],
            [5, new Task(5, 'tu sei un..', Task.TASK_TYPE.MULTIPLE_ANSWER,['essere carnivoro ','essere vegetariano','Mangia sassi '], '0,1', '1,2')],
        ]);
    }

    createNewTask(task_obj) {
        var new_id = this._tasks.size + 1;
        user_obj.id = new_id;
        this._users.set(new_id, task_obj);
        return new_id;
    }

    getTaskById(task_id){
        return this._tasks.get(task_id);
    }

}

// ====== INIT AND EXPORT =========
var taskRepository  = new TaskRepository();
module.exports      = taskRepository;
