const express = require('express') ;
const bookControllers = require('../controllers/book');
const { authenticate, authorizeAdminOrlibrarian } = require('../middlewares/auth');

const router = express.Router() ;


// Library APi endpoint
router.get('', bookControllers.bookList)
router.post('/create', authenticate, authorizeAdminOrlibrarian, bookControllers.create );
router.put('/:id', authenticate, authorizeAdminOrlibrarian, bookControllers.updateBook) ;
router.delete('/:id', authenticate, authorizeAdminOrlibrarian, bookControllers.deleteBook) ;


module.exports = router ;