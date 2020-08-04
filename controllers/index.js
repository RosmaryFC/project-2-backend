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
        const allGuardians = await Guardian.find({}).populate("students");
        res.status(200).json(allGuardians);
    }catch(error){
        res.status(400).send(error);
    }
}

//TODO: find out why .populate does not work and causes 404 error
const findGuardianByID = async (req,res) => {
    try{
        const findGuardian = await Guardian.findById(req.params.id);
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
        //iterate throught students arr
        // req.body.students.forEach( async student => {
        //     //split full name to firstName and lastName
        //     const nameSplit = student.split(" ");
        //     console.log(nameSplit)

        //     //find student document with matching name
        //     let studentDoc = await Student.find({
        //         $and: {
        //             firstName: nameSplit[0],
        //             lastName: nameSplit[1]
        //         }
        //     })

        //     // replace name in list of students with ID in guardian
        //     student = studentDoc._id    
        // })


        //create Guardian
        const newGuardian = await Guardian.create(req.body)

        // const allGuardians = await Guardian.find({}).sort({firstName:1});
        res.status(200).json(newGuardian);
    }catch(error){
        res.status(400).send(error);
    }
}

// const updateGuardian = async (req,res) => {
//     try{
//         res.status(200).send();
//     }catch(error){
//         res.status(400).send(error);
//     }
// }

// const deleteGuardian = async (req,res) => {
//     try{
//         res.status(200).send();
//     }catch(error){
//         res.status(400).send(error);
//     }
// }




module.exports = {findAllStudents, createStudent, updateStudent, deleteStudent,
                    findAllGuardians, findGuardianByID, createGuardian };
