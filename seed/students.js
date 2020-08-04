const db = require('../db');
const Student = require('../models/student')

//define students to seed
const studentSeed = [
    {
        firstName: "jenny",
        lastName: "rodriguez",
        dateOfBirth: "01-01-2010",
        rank: "10th kyu",
        contactInfo: {
            phoneNumber: "111-111-1114",
            email:"fakeemail@email.com",
            address:"1111 one street, apt 1, corona, ny 11368"
        },
        billing: {
            plan: 12,
            startDate: "01-01-2020",
            renewalDate: "01-01-2021",
            monthlyDueDate: 1,
            monthlyFee: 75,
            pastDueBalance: 0,
            currentBalance: 75
        },
        guardians: []
    },
    {
        firstName: "jason",
        lastName: "rodriguez",
        dateOfBirth: "01-02-2010",
        rank: "10th kyu",
        contactInfo: {
            phoneNumber: "111-111-1113",
            email:"fakeemail@email.com",
            address:"1111 one street, apt 1, corona, ny 11368"
        },
        billing: {
            plan: 12,
            startDate: "01-01-2020",
            renewalDate: "01-01-2021",
            monthlyDueDate: 1,
            monthlyFee: 75,
            pastDueBalance: 0,
            currentBalance: 75
        },
        guardians: []
    },
]

//insert all students from array
Student.insertMany(studentSeed,
    (error, response) => {
        if(error){
            console.log('student seed error: ', error);
        }else {
            console.log('student seed response: ', response);
        }
        db.close
    })