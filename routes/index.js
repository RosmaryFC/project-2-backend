const {Router} = require('express');
const router = Router();
const {findAllStudents, createStudent} = require('../controllers/index');

//test conneciton
// router.get('/', (req,res) => {
//     res.send('routes working');
// })



router.get('/students',findAllStudents);


router.post('/students', createStudent);



module.exports = router;