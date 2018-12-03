'use strict'

const USER_TYPE = Object.freeze({
    STUDENT : 1,
    TEACHER : 2,
    BOTH : 3
});

class User {

    constructor(id, firstname, lastname, email, user_type, identification_number){
        this._id = id;
        this._firstname = firstname;
        this._lastname = lastname;
        this._email = email;
        this._user_type = user_type;
        this._identification_number = identification_number;
    }

    // GETTERS
    static get USER_TYPE(){
        return USER_TYPE;
    }
    get id(){
        return this._id;
    }
    get firstname(){
        return this._firstname;
    }
    get lastname(){
        return this._lastname;
    }
    get email(){
        return this._email;
    }
    get user_type(){
        return this._user_type;
    }
    get identification_number(){
        return this._identification_number;
    }

    // SETTERS
    set id(id){
        this._id = id;
    }
    set firstname(firstname){
        this._firstname = firstname;
    }
    set lastname(lastname){
        this._lastname = lastname;
    }
    set email(email){
        this._email = email;
    }
    set user_type(user_type){
        this._user_type = user_type;
    }
    set identification_number(identification_number){
        this._identification_number = identification_number;
    }

    /* method automatically called by stringify to transform obj to JSON */
    toJSON() {
        return ({
            id: this.id,
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            user_type: this.user_type,
            identification_number: this.identification_number
        });
    }
}

module.exports = User;
