'use strict'
const TASK_TYPE = Object.freeze({
    OPEN: 0,
    SINGLE_ANSWER : 1,
    MULTIPLE_ANSWER : 2
});

class Task {
    constructor(id, question, type, answers, correct_answer, student_answer){
        this._id = id;
        this._question = question;
        this._type = type;// 0=aperta .. 1=risposta singola 2=risposta aperta
        this._answers = answers;//ARRAY OF ANSWERS
        this._correct_answer = correct_answer; // only if type is 1 2
        this._student_answer = student_answer;
    }

    // GETTERS
    static get TASK_TYPE(){
        return TASK_TYPE;
    }
    get id(){
        return this._id;
    }
    get question(){
        return this._question;
    }
    get type(){
        return this._type;
    }
    get answers(){
        return this._answers;
    }
    get correct_answer(){
        return this._correct_answer;
    }
    get student_answer(){
        return this._student_answer;
    }

    // SETTERS
    set id(id){
        this._id = id;
    }
    set question(question){
        this._question = question;
    }
    set question(question){
        this._question = question;
    }
    set answers(answers){
        this._answers = answers;
    }
    set correct_answer(correct_answer){
        this._correct_answer = correct_answer;
    }
    set student_answer(student_answer){
        this._student_answer = student_answer;
    }

    /* method automatically called by stringify to transform obj to JSON */
    toJSON() {
        return ({
            id: this.id,
            firstname: this.firstname,
            question: this.question,
            type: this._type,
            answers: this.answers,
            correct_answer: this.correct_answer,
            student_answer: this.student_answer
        });
    }
}

module.exports = Task;
