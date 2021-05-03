const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRouter = require('./routes/user') ;
const libRouter = require('./routes/book');

// Assign port number forn dotenv file
//const port = process.env.Port ;  [Why this not working..... ?]
const app = express() ;
dotenv.config() ;
// DB connection 
connectDB() ;

//body-parser
app.use(express.json()) ;

//routes
app.use('/user', userRouter) ;
app.use('/library', libRouter) ;


app.get('/', (req,res)=>{
    res.send('Hello World');
})

app.listen( process.env.Port , ()=>{
    console.log(`LMS app Listening at http://localhost:${process.env.Port}`);
})