const User = require('../models/user');
const bcrypt = require('bcrypt');

const generateToken = require('../utils/generateToken');


/*
    Test command ...
    {
        "name":"Abir Rahmn",
        "password": "test1234",
        "email":"abir.talks@gmail.com",
        "userType": "student"
    }

    {
        "name":"Mahfuzur Rahman",
        "password": "test.1234",
        "email":"mahfuzur@gmail.com",
        "userType": "librarian"
    }
*/


//Creating user
const signup = async (req, res) =>{
    try {
        const user = new User(req.body) ;
        await user.save() ;
        res.status(201).json({
            message: 'User created Successfully.',
        }) 
        
    } catch (err) {
        res.status(500).json({
            error: `Server side error`,
        })
        
    }
}

//Login user 
const login = async (req, res) =>{
    try {

        const {email, password } = req.body ;
        const user = await User.findOne( {email} ) ;
        const isValid = await user.matchPassword(password) ;

        if(user && isValid) {
            res.cookie('jwt_token', generateToken[user._id], {expiresIn: '1d'}) ;
            res.status(200).json ({
                token: generateToken(user._id),
                message: "Login successful!",
            })

        }else{
            res.status(401).json({
                "error": "Authetication failed!"
            })
        }
        
    } catch (err) {
        res.status(401).json({
            "error": `Authetication failed!`,             
        })
    }
}

const logout = (req,res)=>{

    res.clearCookie('jwt_token');
    res.status(200).json({
        message: 'Logout Successfully..'
    })

}

// Get all user from DB
const getUser = async (req, res) =>{
    try {
        const users = await User.find().select({
            _id: 0,
            password: 0,
            __v: 0,
        }) ;
        res.status(201).json({
            data: users,
            message: 'All Data Successfully Retrived' 
        });
    } catch (err) {
        console.log('Server Side Error!');
    }

}

//update user
const updateUser = async (req, res) =>{
    try {
        const filter = { _id : req.params.id } ;

        const updatedData = {}  
        if(req.body.name) updatedData.name =req.body.name;
        if(req.body.email) updatedData.email = req.body.email ;
        if(req.body.password){
            // hash the password before saving..
            const salt = await bcrypt.genSalt() ;
            updatedData.password = await bcrypt.hash(req.body.password, salt) ;
            
        }

           
        const options = { new: true, upsert: false } ;
        const result = await User.findByIdAndUpdate(filter, updatedData, options ) ;

        res.status(201).json({
            data: result ,
            message: 'User updated successfully'
        })
    } catch (err) {
        res.status(501).json({
            errors: `Server Side errors..!`
        })
    }
}

// delete method
const deleteUser = async (req, res) =>{
    try {

        const filter = { _id: req.params.id };
        const result = await User.findByIdAndDelete(filter) ;
        
        console.log(result);
        if(result){
            res.status(201).json({
                message: 'User Deleted Successfully!'
            })
        }else{
            res.status(501).json({
                message: 'Already Deleted!'
            })
        }
        
    } catch (err) {
        res.status(500).json({
            error: `There was a server side errors! with ${err}`,
        })
        
    }
}

module.exports = {
    signup,
    login,
    logout,
    getUser,
    updateUser,
    deleteUser
}