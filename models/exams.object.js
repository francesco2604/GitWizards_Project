'use strict'


class Exam
{
  constructor(id,description, deadline, numerotasks,teacher,tasks,students)
  {
    this.id=id;
    this.description=description;
    this.deadline=deadline;
    this.numerotasks=numerotasks;
    this.teacher=teacher;
    this.tasks=tasks;
    this.students=students;
  }

  get idGet()
  {return this.id;}

  get descriptionGet()
  {return this.description;}

  get deadlineGet()
  {return this.deadline;}

  get numerotasksGet()
  {return this.numerotasks;}

  get teacherGet()
  {return this.teacher;}

  get  tasksGet()
  {return this.tasks;}

  get studentsGet()
  {return this.students;}

  toJson()
  {
    return ({
      id: this.id,
      description: this.description,
      deadline: this.deadline,
      numerotasks: this.numerotasks,
      teacher: this.teacher,
      tasks: this.tasks,
      students: this.students
     });
  }
}


module.exports = Exam;
