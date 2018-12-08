/* Example variables */
var task = {
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
    tasks: [task,
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

var exampleError = "123";

module.exports = { task, exam, exampleError };