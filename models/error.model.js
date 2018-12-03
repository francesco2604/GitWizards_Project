'use strict'

const ERROR_CODE = Object.freeze({
    BAD_REQUEST : 400,
    FORBIDDEN : 403,
    NOT_FOUND : 404
});

class Error {

    constructor(code, message){
        this._code = code;
        this._message = message;
    }

    // GETTERS
    static get ERROR_CODE(){
        return ERROR_CODE;
    }
    get code(){
        return this._code;
    }
    get message(){
        return this._message;
    }

    // SETTERS
    set code(code){
        this._code = code;
    }
    set message(message){
        this._message = message;
    }

    /* method automatically called by stringify to transform obj to JSON */
    toJSON() {
        return ({
            code: this.code,
            message: this.message
        });
    }
};

module.exports =  Error;
