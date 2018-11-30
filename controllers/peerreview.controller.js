const task_prova = {id: 123456,
                    numeroDomanda: 2,
                    question: 'diametro della Terra?',
                    type: 1,
                    answers: ['9.742 km',
                              '19.742 km',
                              '12.742 km'],
                    correctAnswer: '3',
                    studentAnswer: '1'};

const task_prova2 = task_prova;

var tasks = [task_prova, task_prova2];

function getPeerreviewAll(req, res){
	res.status(200).json(tasks);
}

module.exports = {getPeerreviewAll, postPeerreview, putPeerreview};