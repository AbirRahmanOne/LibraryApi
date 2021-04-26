const express = require('express') ;
const userControllers = require('../controllers/user');
const router = express.Router() ;

const requiredLogin = require('../middlewares/auth');

//login(auth) APi
router.post('/register', userControllers.signup ) ;
router.post('/login', userControllers.login) ;
router.post('/logout', requiredLogin , userControllers.logout) ;


// User info api 
router.get('/all', requiredLogin, userControllers.getUser ) ;
router.put('/:id', userControllers.updateUser ) ;
router.delete('/:id', userControllers.deleteUser) ;




module.exports = router ;