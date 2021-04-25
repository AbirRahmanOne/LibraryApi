const express = require('express') ;
const userControllers = require('../controllers/user');
const router = express.Router() ;



// Routes for user api
router.get('/all', userControllers.getUser ) ;
router.post('/', userControllers.createUser ) ;




module.exports = router ;