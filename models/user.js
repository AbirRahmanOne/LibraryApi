const mongoose = require('mongoose') ;
const Schema = mongoose.Schema ;
const bcrypt = require('bcrypt');

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

//instance method 
// check if the user entered password matches
// with the one in the database
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password) ;
};


//Pre hooks (middlewares)
// hashing password value using 'bcrpyt' 
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt() ;
    this.password = await bcrypt.hash(this.password, salt) ; //password is hashed.
    next() ;
});

// Fire a function(Hook) After new data saved to DB
userSchema.post('save', async ( data,next)=>{
    console.log(`New data: ${data}`) ;
    next() ;
}) 


const User = new mongoose.model('user', userSchema) ;

module.exports = User ;