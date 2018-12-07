'use strict'

// === IMPORTS =====
var User = require('../models/user.model');

class UserRepository {

    constructor() {
        this._users = new Map([
            [1, new User(1, 'Mario', 'Rossi', 'mario.rossi@example.com', User.USER_TYPE.STUDENT, 123456)],
            [2, new User(2, 'Marco', 'Bonni', 'marco.bonni@example.com', User.USER_TYPE.TEACHER, 789065)],
        ]);
    }

    createNewUser(user_obj) {
        var new_id = this._users.size + 1;
        user_obj.id = new_id;
        this._users.set(new_id, user_obj);
        return new_id;
    }

    getUserById(user_id){
        return this._users.get(user_id);
    }

    getAllUsers(user_type=User.USER_TYPE.STUDENT){
        var users = this._users ? Array.from(this._users.values()) : null;
        if(users){
            return users.filter((user) => {
                return user.user_type === user_type || user.user_type === User.USER_TYPE.BOTH;
            });
        }
        return users;
    }

    getUserRoleByUserId(user_id){
        var user = this.getUserById(user_id);
        if(user){
            return user.user_type;
        }
        return -1;
    }

    deleteUserById(user_id){
        return this._users.delete(user_id);
    }

}

// ====== INIT AND EXPORT =========
var userRepository  = new UserRepository();
module.exports      = userRepository;
