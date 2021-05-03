const express = require('express') ;
const userControllers = require('../controllers/user');
const router = express.Router() ;

const {requiredLogin, authorizeAdminOrlibrarian } = require('../middlewares/auth');

router.post('/register', userControllers.signup ) ;
router.post('/login', userControllers.login) ;
router.post('/logout',userControllers.logout) ;


// User info api 
router.get('/all', userControllers.getUser ) ;
router.put('/:id', userControllers.updateUser ) ;
router.delete('/:id',userControllers.deleteUser) ;





module.exports = router ;