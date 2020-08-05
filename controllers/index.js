//connect to mongo even though var is not being used
const db = require('../db/index');
//pass in Schemas
const Student = require ('../models/student')
const Guardian = require ('../models/guardian')

//STUDENT CONTROLLERS
const findAllStudents = async (req,res) => {
    try {
        //sort alphabetically by last name
        const findAllStudents = await Student.find({}).sort({firstName:1});
        res.status(200).json(findAllStudents)
    }catch(error){
        res.status(400).send(error)
    }
}


const createStudent = async (req,res) => {
    try{
        const newStudent = await Student.create(req.body);
        const allStudents = await Student.find({}).sort({firstName:1});
        res.status(200).json(allStudents);
    }catch(error){
        res.status(400).send(error);
    }
}

const updateStudent = async (req,res) => {
    try{
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, {new:true})
        const allStudents = await Student.find({}).sort({firstName:1});
        res.status(200).json(allStudents);
    }catch(error){
        res.status(400).send(error);
    }
}

const deleteStudent = async (req,res) => {
    try{
        const deleteStudent = await Student.findByIdAndDelete(req.params.id);
        const allStudents = await Student.find({}).sort({firstName:1});
        res.status(200).json(allStudents);
    }catch(error){
        res.status(400).send(error);
    }
}

//------------------------------GUARDIAN CONTROLLERS

const findAllGuardians = async (req,res) => {
    try{
        const allGuardians = await Guardian.find({});
        res.status(200).json(allGuardians);
    }catch(error){
        res.status(400).send(error);
    }
}

//TODO: find out why .populate does not work and causes 404 error
const findGuardianByID = async (req,res) => {
    try{
        const findGuardian = await Guardian.findById(req.params.id).populate("students");
        console.log('guardian', findGuardian)
        console.log('guardian type', typeof(findGuardian))
        console.log('student type', typeof(findGuardian.students))
        console.log('students element type', typeof(findGuardian.students[0]))
        res.status(200).json(findGuardian);
    }catch(error){
        res.status(400).send(error);
    }
}



const createGuardian = async (req,res) => {
    try{
        const guardianReqBody = req.body;

        for (let i = 0; i < guardianReqBody.students.length; i++) {
            const student = guardianReqBody.students[i];
            console.log('student', student)

            //split full name to firstName and lastName
            const nameSplit = student.split(" ");
            console.log('nameSplit', nameSplit)

            //find student document with matching name
            let studentDoc = await Student.findOne({
                $and: [
                    {firstName: nameSplit[0]},
                    {lastName: nameSplit[1]}
                ]
            })

            console.log('studentDoc', studentDoc);
            console.log('studentDocID', studentDoc._id);

            // replace name in list of students with student ID in guardian
            guardianReqBody.students[i] = studentDoc._id;    
            console.log('guardianReqBody', guardianReqBody);
        }


        //create Guardian
        const newGuardian = await Guardian.create(guardianReqBody);
        console.log('newGuardian', newGuardian);

        for(let i = 0; i < guardianReqBody.students.length; i++) {
            //find student document with matching name
            let studentDoc = await Student.findById(guardianReqBody.students[i]);
            console.log('studentDoc:' + studentDoc);

            console.log('new guardian id', newGuardian._id);

            //push Guardian ID to student.guardians array
            await studentDoc.guardians.push(newGuardian._id);
            await studentDoc.save()
        }

        // const allGuardians = await Guardian.find({}).sort({firstName:1});
        res.status(200).json(newGuardian);
    }catch(error){
        res.status(400).send(error);
    }
}

const updateGuardian = async (req,res) => {
    try{
        const findGuardian = await Guardian.findByIdAndUpdate(req.params.id, req.body, {new:true});

        res.status(200).send(findGuardian);
    }catch(error){
        res.status(400).send(error);
    }
}

const deleteGuardian = async (req,res) => {
    try{
        const deleteGuardian = await Guardian.findByIdAndDelete(req.params.id);
        res.status(200).send(deleteGuardian);
    }catch(error){
        res.status(400).send(error);
    }
}




module.exports = {findAllStudents, createStudent, updateStudent, deleteStudent,
                    findAllGuardians, findGuardianByID, createGuardian, updateGuardian, deleteGuardian };
