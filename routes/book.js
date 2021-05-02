const express = require('express') ;
const bookControllers = require('../controllers/book');
const { requiredLogin, authorizeAdminOrlibrarian } = require('../middlewares/auth');

const router = express.Router() ;


// Library APi endpoint
router.get('', bookControllers.bookList)
router.post('/create',  bookControllers.create );
router.put('/:id', bookControllers.updateBook) ;
router.delete('/:id', bookControllers.deleteBook) ;


module.exports = router ;