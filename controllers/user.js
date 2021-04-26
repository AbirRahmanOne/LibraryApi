const User = require('../models/user');
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


// Api for post request [Creating user]
const signup = async (req, res) =>{
    try {
        const user = new User(req.body) ;
        console.log(user); // printing the output to console .
        await user.save() ;
        res.status(201).json({
            message: 'User created Successfully.',
        }) 
        
    } catch (err) {

        res.status(500).json({
            error: `Server side error ${err}`,
        })
        
    }
}

//Login user 
const login = async (req, res) =>{
    try {

        const {email, password } = req.body ;
        const user = await User.findOne( {email} ) ;
        const isValid = await user.matchPassword(password) ;
        console.log(isValid);
        console.log(user);
        if(user && isValid) {

            res.cookie('jwt_token', generateToken[user._id], {expiresIn: '1d'}) ;
            res.status(200).json ({
                token: generateToken(user._id),
                message: "Login successful!",
            })

        }else{
            res.status(401).json({
                "error": "Authetication failed!...s"
            })
        }

       
        
    } catch (err) {
        res.status(401).json({
            "error": `Authetication failed! ${err}`, 
            
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

//Q: Sepecific modification options 
const updateUser = async (req, res) =>{
    try {
        const filter = { _id : req.params.id } ;

        

        const updatedData = {
            name: req.body.name,
            email: req.body.email
        }
       
        const options = { new: true, upsert: false } ;

        const result = await User.findByIdAndUpdate(filter, updatedData, options ) ;

        res.status(201).json({
            data: result ,
            message: 'User updated successfully'
        })
    } catch (err) {
        res.status(501).json({
            errors: `Server Side errors..!${err}`
        })
    }

}

// deleting user from DB  
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