const mongoose = require('mongoose') ;
const Schema = mongoose.Schema ;

const userSchema = new Schema({
    name:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true,

    },
    email:{
        type: String,
        require: true,
        unique: true,
        lowercase: true,
    },
    userType: {
        type: String,
        enum: ["student", "librarian"],
    }

}) ;

const User = new mongoose.model('user', userSchema) ;

module.exports = User ;