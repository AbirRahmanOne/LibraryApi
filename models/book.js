const mongoose = require('mongoose') ;
const Schema = mongoose.Schema ;

const bookSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    author:{
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    relaseDate:{
        type: String,
        required: true
    },
    img:{
        type: String,
    },
    status:{
        type: String,
        default: 'active'
    }

});



const Book = new mongoose.model('book', bookSchema);
module.exports = Book ;
