const mongoose = require ('mongoose');
const {Schema, model} = mongoose;

const guardianSchema = new Schema (
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
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
        students:[{
            type: Schema.Types.ObjectId,
            ref: 'records'
          }]
    }
);

module.exports = model("Guardian", guardianSchema);
