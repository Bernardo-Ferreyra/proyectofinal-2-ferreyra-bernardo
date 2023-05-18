const { Schema, model }= require('mongoose')

const collection = 'usuarios'

const userSchema = new Schema({
    first_name: {
        type: String,
        index: true,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    date_of_birth:{
        type: Date,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})





const userModel= model(collection, userSchema)

module.exports = { userModel }