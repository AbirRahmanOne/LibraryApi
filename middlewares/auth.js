const { json } = require('express');
const jwt = require('jsonwebtoken') ;

const authenticate = async (req, res, next) =>{
    const token = req.headers['authorization'] ;
    if(typeof token === 'undefined'){
        res.forbidden({
            message: 'not logged in'
        });
    }

    try {
        const payload = await jwt.verify(token, process.env.SECRET_KEY) ;
        if(!payload){
            res.status(401).json({
                message: 'Unauthorized, Please login first'
            });
        }
        if(payload.userType === "librarian"){
            req.admin = payload ;
            next() ;
        }else{
            req.user = payload ;
            next() ;
        }
    } catch (err) {
        res.status(401).json({
            message: `Unauthorized, invalid token`
        });
    }
}


const authorizeAdminOrlibrarian =  (req, res, next)=>{
    if(req.admin){
        next() ;
        return ;
        
    }else{
        res.status(403).json({
            Error: `Unauthorized User`
        });
    }
  }

 
module.exports ={
    authenticate,
    authorizeAdminOrlibrarian
}