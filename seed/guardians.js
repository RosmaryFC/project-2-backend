const db = require('../db');
const Student = require('../models/student');
const Guardian = require('../models/guardian');

//define students to seed (with reference to student)
const guardianSeed = [
    {
        firstName: "ramon",
        lastName: "rodriguez",
        contactInfo: {
            phoneNumber: '111 111 1111',
            email: 'fakeemailparent@email.com',
            address: '1111 one street, apt 1, corona, ny 11368'
        },
        students: ["jenny rodriguez", "jason rodriguez"]
    },
    {
        firstName: "luisa",
        lastName: "rodriguez",
        contactInfo: {
            phoneNumber: '111 111 1112',
            email: 'fakeemailparent@email.com',
            address: '1111 one street, apt 1, corona, ny 11368'
        },
        students: ["jenny rodriguez", "jason rodriguez"]
    }
]


//add the guardians seed array with necessary awaits
const addGuardians = async () => {

    await Promise.all(guardianSeed.map(async guardianToAdd => {

        await Promise.all(guardianToAdd.students.forEach( async student => {
            const nameSplit = student.split(" ");

            //find student document with matching name
            let studentDoc = await Student.find({
                $and: {
                    firstName: nameSplit[0],
                    lastName: nameSplit[1]
                }
            })

            // replace name in list of students with ID in guardian
            student = studentDoc._id    
        }))

        //create guardian
        const guardian = await Guardian.create(guardianToAdd);

        await Promise.all(guardianToAdd.students.forEach( async student => {
            let studentDoc = await Student.findById(student)
            // push guardian ID to  student.guardian array
            await studentDoc.guardians.push(guardian._id);
        }))
        
        await student.guardians.push()

    }))

    db.close()
}

addGuardians()