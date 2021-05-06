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

let port = process.env.PORT ;

if( port ==null || port == ''){
    port = 8000 ;
}

//body-parser
app.use(express.json()) ;

//routes
app.use('/user', userRouter) ;
app.use('/library', libRouter) ;


app.get('/', (req,res)=>{
    res.send('Library Management System');
})

app.listen( port , ()=>{
    console.log(`LMS app Listening at http://localhost:${port}`);
})