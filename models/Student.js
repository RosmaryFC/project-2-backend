const mongoose = require ('mongoose');
const {Schema, model} = mongoose;


const studentSchema = new Schema (
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type:String,
            required: true
        },
        dateOfBirth: {
            type: Date,
            required: true
        },
        rank: {
            type: String,
            required: true
        },
        contactInfo:{
            phoneNumber: {
                type: String,
                required: true,
            },
            email: {
                type: String,
            },
            address: {
                type: String,
            }
        },
        billing: {
            plan: {
                type: Number,
                required: true
            },
            startDate: {
                type: Date,
                required: true
            },
            RenewalDate:{
                type: Date,
                required: true
            },
            monthlyDueDate:  {
                type: Number,
                required: true
            },
            monthlyFee: {
                type: Number,
                required: true
            },
            pastDueBalance: {
                type: Number,
                required: true
            },
            currentBalance: {
                type: Number,
                required: true
            }
        },
        guardians:[
            {
                guardian:{
                    type: Schema.Types.ObjectId,
                    ref: 'parents'
                },
               relationship: {
                   type: String
               }
            }
        ]
    }
);

module.exports = model('Student', studentSchema);
