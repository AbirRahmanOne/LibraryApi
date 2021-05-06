const express = require('express') ;
const userControllers = require('../controllers/user');
const router = express.Router() ;

const { authenticate ,authorizeAdminOrlibrarian } = require('../middlewares/auth');

router.post('/register', userControllers.signup ) ;
router.post('/login', userControllers.login) ;
router.post('/logout',authenticate,userControllers.logout) ;


// User info api 
router.get('/all', userControllers.getUser ) ;
router.put('/:id',authenticate,authorizeAdminOrlibrarian, userControllers.updateUser ) ;
router.delete('/:id',authenticate,authorizeAdminOrlibrarian, userControllers.deleteUser) ;



module.exports = router ;