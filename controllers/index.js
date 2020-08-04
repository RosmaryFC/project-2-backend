const Student = require ('../models/student')
const Guardian = require ('../models/guardian')

//STUDENT CONTROLLERS
//TODO: find out why it cannot get a response 
const findAllStudents = async (req,res) => {
    try {
        //sort alphabetically by last name
        const findAllStudents = await Student.find({})
        res.status(200).send(findAllStudents)
    }catch(error){
        res.status(400).send(error)
    }
}

//
const createStudent = async (req,res) => {
    try{
        const newStudent = await Student.create(req.body);
        res.status(200).send(newStudent);
    }catch(error){
        res.status(400).send(error);
    }
}

// const updateStudent = async (req,res) => {
//     try{
//         res.status(200).send();
//     }catch(error){
//         res.status(400).send(error);
//     }
// }

// const deleteStudent = async (req,res) => {
//     try{
//         res.status(200).send();
//     }catch(error){
//         res.status(400).send(error);
//     }
// }

//GUARDIAN CONTROLLERS

// const findAllGuardians = async (req,res) => {
//     try{
//         res.status(200).send();
//     }catch(error){
//         res.status(400).send(error);
//     }
// }

// const createGuardian = async (req,res) => {
//     try{
//         res.status(200).send();
//     }catch(error){
//         res.status(400).send(error);
//     }
// }

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




module.exports = {findAllStudents, createStudent};
