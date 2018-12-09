class PeerReview {
    constructor(id, examid, task, studentanswer, mark, description, deadline) {
        this._id = id;
        this._examid = examid;
        this._task = task;
        this._studentanswer = studentanswer;
        this._mark = mark;
        this._description = description;
        this._deadline = deadline;
    }

    get id() {
        return this._id;
    };
    get examid() {
        return this._examid;
    };
    get tasks() {
        return this._tasks;
    };
    get studentanswer() {
        return this._studentanswer;
    };
    get mark() {
        return this._mark;
    };
    get description() {
        return this._description;
    };
    get deadline() {
        return this._deadline;
    };

    set id(id) {
        this._id = id;
    }
    set examid(examid) {
        this._examid = examid;
    };
    set tasks(tasks) {
        this._tasks = tasks;
    };
    set studentanswer(studentanswer) {
        this._studentanswer = studentanswer;
    };
    set mark(mark) {
        this._mark = mark;
    };
    set description(description) {
        this._description = description;
    };
    set deadline(deadline) {
        this._deadline = deadline;
    };

    toJSON() {
        return ({
            id: this.id,
            examid: this.examid,
            task: this.task,
            studentanswer: this.studentanswer,
            mark: this.mark,
            description: this.description,
            deadline: this.deadline
        });
    }
}

module.exports = PeerReview;