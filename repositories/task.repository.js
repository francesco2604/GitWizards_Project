'use strict'

// === IMPORTS =====
var Task = require('../models/task.model');

class UserRepository {
    constructor() {
        this._tasks = new Map([
            [1, new Task(1, 'Quanti anni aveva napoleone alla sua morte?', '1', ['48','44','12'], '2', '1')],
            [2, new Task(2, 'Quanti anni aveva napoleone alla sua nascita?', '1', ['0','1','9 mesi'], '1', '2')],
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
var taskRepository  = new UserRepository();
module.exports      = taskRepository;
