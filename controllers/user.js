const User = require('../models/user');


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


// Api for post requrest [Creating user]
const createUser = async (req, res) =>{
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

const updateUser = async (req, res) =>{
    try {
        const filter = { _id : req.params.id } ;
        const updatedData = {
            name: req.body.name ,
            email: req.body.email,
            password: req.body.password,
            
        }
        const options = { new: true, upsert: false } ;

        const result = await User.findByIdAndUpdate(filter, updatedData, options ) ;

        res.status(201).json({
            data: result ,
            message: 'User updated successfully'
        })
    } catch (err) {
        res.status(501).json({
            errors: 'Server Side errors..!'
        })
    }

}

// deleting user from DB

//Q. if already deleted id paased why can't get errors 
const deleteUser = async (req, res) =>{
    try {

        const filter = { _id: req.params.id };
        await User.deleteOne(filter) ;
        res.status(201).json({
            message: 'User Deleted Successfully!'
        })
    } catch (err) {
        res.status(500).json({
            error: `There was a server side errors! with ${err}`,
        })
        
    }


}

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser
}