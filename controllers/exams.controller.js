
const task_prova = {id: 123456,numeroDomanda: 2,question: 'diametro della Terra?',type: 1,answers: ['9.742 km','19.742 km','12.742 km'],correctAnswer: '3',studentAnswer: '1'};

var user ={id:32,firstname: 'mario',lastname: 'rossi',email: 'prova@gmail.com',type: 'Teacher',identification_number:123456 };

var exam_prova= {ex_id: 158898,description: 'prova',deadline: 3600,numerotasks: 2,user,task_prova	};

var examList = [{id: 1, description: 'prova', deadline: 3600, numerotasks: 2,user, task_prova 	},
                {id: 2, description: 'prova2', deadline: 3600, numerotasks: 2,user, task_prova 	},
                {id: 3, description: 'prova3', deadline: 3600, numerotasks: 2,user, task_prova 	},
                {id: 4, description: 'prova4', deadline: 3600, numerotasks: 2,user, task_prova 	},
                {id: 5, description: 'prova5', deadline: 3600, numerotasks: 2,user, task_prova 	},
                {id: 6, description: 'prova6', deadline: 3600, numerotasks: 2,user, task_prova 	},
                {id: 7, description: 'prova7', deadline: 3600, numerotasks: 2,user, task_prova 	},
                {id: 8, description: 'prova8', deadline: 3600, numerotasks: 2,user, task_prova 	}];

var propertiesForUpdate = ['description', 'deadeline'];
var idSequence = 0;
//ok
function getExamsList()
{
    return examList;
//	res.status(200).json(examList);
}

// ok
 function getExamsById(id)
{
	const index = examList.findIndex((item)=> {return item.id===id})
if (index===-1) {
		//res.status(404).json(result404)
		return '"Not Found"'
	}
try {
				 res.send(examList[index])
			 } catch (error) {
															 res.status(400).json(result404)
															 console.log('\n\nerror', error)
	}

}
//ok
function postExams(exam)
{
	  //const exams_id =  res.body.json(exam_prova);

	//onst exams_new =  res.body.json(exams); solo se prendo il nuovo esame dal body
  if(exam.description === undefined)
    return error
    idSequence++;
    exam.id = idSequence
    exam
	examList.push(exam)
	res.status(200).json(result200)
	//res.json(exam_prova)
	console.log("new",exam)
  console.log("new list",examList)

}



/*function putExamsById(req,res)
{

		  const index = examList.findIndex((item)=> {return item.id===parseInt(req.params.id)})
		 if(index ===-1)
		 {
			 const ex =  {id:id}
			 examList.push(ex)
		 }
		 else {
			examList.splice(index,1)
			const ex =  {id:id}
			 examList.push(ex)
		 }
		   res.status(200).json(result200)
		 //res.json(ex)
		 console.log(examList)
}*/

/*function isValidInput(body) {
        var valid = true;

        //controlla i dati sia definito e non sia vuoto
        if (body.description === undefined || body.deadline === undefined || body.numerotasks === undefined )
        {
                valid = false;
        }
        //controlla se le date sono valide e final_deadline è almeno un giorno prima di review_deadline
        else if (isNaN(Date.parse(body.deadline)))
        {
                valid = false;
        }

        return valid;

}*/



function putExamsById(id, propertiesChanged) {

        var exam_id=parseInt(req.params.id)
        const index = examList.findIndex((item)=> {return item.id===id})

        if(exam_id === undefined || isNaN(parseInt(exam_id)))
        {


                res.status(400).json(result400)
        }
        else
        {

                //var exam = this.getExamById(req,res, exam_id);   DA CONTROLLARE
                //se non esiste esame con tale id
                if (exam === undefined)
                {

                                res.status(404).json(result404)
                }
                else
                {

                        //get parametri
                        /*var deadline = req.body.deadline;
                        var numerotasks = req.body.numerotasks;
                        //get array di taskInExam
                        var user = req.body.user;
                        var task = req.body.task;*/
                        var examFromDB = getExamsById(exam_id);

                        for(let p of propertiesForUpdate) {
                          let value = updatedExam[p];

                          if(!value){
                            examFromDB[p] = value;
                          }
                        }

                      /*  var examUpdated = {
                          ...examFromDB,
                          ...propertiesChanged
                        };/*



                        deleteExamsById(exam_id)
                        examList.push(examFromDB)
                        var exam_first= {ex_id: 158898,description: 'prova',deadline: 3600,numerotasks: 2,user,task_prova	};


                        const index = examList.findIndex((item)=> {return item.id===id})
                       	examList.splice(index,1)
                        var exam_push= {id, description/*,deadline, numerotasks,user,task*/};
                        examList.push(exam_push)



                }
          }

}



// ok
function deleteExamsById(req,res)
{
	const index = examList.findIndex((item)=> {return item.id===parseInt(req.params.id)})
  if(index===-1)
  {
    res.status(400).json(result404)
    //console.log('\n\nerror', error)
  }
  else{
      examList.splice(index,1)
      console.log('\ndeleting ',req.params.id)
      console.log('now:',examList)
      res.status(200).json(result200)
}




}

module.exports = {getExamsList,postExams,getExamsById,putExamsById,deleteExamsById}
