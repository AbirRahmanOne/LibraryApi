const express = require('express') ;
const userControllers = require('../controllers/user');
const router = express.Router() ;



// Routes for user api
router.get('/all', userControllers.getUser ) ;
router.post('/', userControllers.createUser ) ;
router.delete('/:id', userControllers.deleteUser) ;




module.exports = router ;