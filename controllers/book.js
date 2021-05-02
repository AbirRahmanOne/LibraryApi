const Book = require('../models/book');


// create new book record
const create = async (req, res)=>{
    try {
        const newBook = new Book(req.body) ;
        await newBook.save() ;

        res.status(201).json({
            message: 'New Book Record has been created Successfully',
        });

    } catch (err) {
        res.status(500).json({
            error: `Server Side problem`,
        });
    }

}

const bookList =  async (req, res)=>{
    try {   
        const books = await Book.find().select({
            __v:0,
            img:0,
        });
        res.status(201).json({
            data: books,
            message: 'All book list'
        });
    } catch (err) {
        console.log(`Server side error`);
    }

}

// update book record
const updateBook = async (req, res)=>{

    try {
        const filter = { _id: req.params.id };

        const updateData = {};
        if(req.body.name) updateData.name = req.body.name ;
        if(req.body.author) updateData.author = req.body.author ;
        if(req.body.genre) updateData.genre = req.body.genre ;
        if(req.body.relaseDate) updateData.relaseDate = req.body.relaseDate ;
        if(req.body.status) updateData.status = req.body.status ;


        const options  =  { new: true, upsert: false } ;
        const result = await Book.updateOne(filter, updateData , options);

        res.status(201).json({
            message: "Book update successfully.."
        })
    } catch (err) {
        res.status(501).json({
            errors: `Server Side errors` 
        })
    }

}


// delete book record
const deleteBook = async (req, res)=>{
    try {
        const filter = {_id : req.params.id }; 
        const result = await Book.findByIdAndDelete(filter) ;

        if(result){
            res.status(201).json({
                message: "Book record deleted successfully."
            });
        }else{
            res.status(501).json({
                message: 'No data found'
            })
        }
    } catch (err) {
        res.status(500).json({
            error: `There was a server side errors!`
        })
    }

}


// create new book record
const changeStatus = async (req, res)=>{


}


module.exports = {
    create,
    bookList,
    updateBook,
    deleteBook,
    changeStatus
}





