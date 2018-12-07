/* Example variables */
var test_task = {
  numeroDomanda: 2,
  question: 'diametro della Terra?',
  type: 1,
  answers: ['9.742 km',
    '19.742 km',
    '12.742 km'],
  correctAnswer: '3',
  studentAnswer: '1'
};

var exam = {
    id: 0,
    example: null,
    description: 'esame di valutazione conoscenze generali',
    deadline: 3600,
    numerotasks: 2,
    teacher: {
        id: 32,
        firstname: 'Marco',
        lastname: 'Giunta',
        email: 'marco.giunta@example.com',
        type: 'Teacher',
        identification_number: 908765
    },
    tasks: [test_task,
        {
            id: 456,
            numeroDomanda: 3,
            question: 'diametro della Luna?',
            type: 1,
            answers: [
                '4.742 km',
                '14.742 km',
                '8.742 km'
            ],
            correctAnswer: 3
        }
    ],
    students: [
        {
            id: 12,
            firstname: 'Mario',
            lastname: 'Rossi',
            email: 'mario.rossi@example.com',
            type: 'Student',
            identification_number: 345678
        }
    ]
};

var submissions = [exam];

/* POST method for Submission */
function postSubmission(bodyObject) {
    var new_exam = bodyObject;
    var submissionsLength = submissions.length;
    
    new_exam.id = submissionsLength;
    submissions.push(new_exam);

    return submissions[submissionsLength];
};

module.exports = { postSubmission };