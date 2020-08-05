const express = require('express');
const router =  express.Router();
const {findAllStudents, createStudent, updateStudent, deleteStudent, 
    findAllGuardians, findGuardianByID, createGuardian, updateGuardian, deleteGuardian} = require('../controllers/index.js');

//test conneciton
router.get('/', (req,res) => {
    res.send('routes working');
})

//STUDENT ROUTERS

router.get('/students',findAllStudents);

router.post('/students', createStudent);

router.put('/students/:id', updateStudent);

router.delete('/students/:id', deleteStudent);

//GUARDIAN ROUTERS
router.get('/guardians', findAllGuardians);

router.get('/guardians/:id', findGuardianByID);

router.put('/guardians/:id', updateGuardian);

router.post('/guardians', createGuardian);

router.delete('/guardians/:id', deleteGuardian);


module.exports = router;