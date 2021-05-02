const { json } = require('express');
const jwt = require('jsonwebtoken') ;

const requiredLogin = (req, res, next) => {
    const token = req.headers['authorization'];
      if (!token) {
          return res.status(403)
              .json({
                  Error: 'Token Not Found'
              });
      } else {
          jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
              if (err) {
                  return res.status(403)
                      .json({
                          Error: 'Token does not match'
                      });
              } else {
                  req.admin =  data ;
                  next(); // go to next function
              }
          });
      }
  };

  const authorizeAdminOrlibrarian = async (req, res, next)=>{
    if(req.admin){
        next() ;
        return ;
    }else{
        res.status(403).json({
            Error: 'Unauthorized User'
        });
    }
  }

 
module.exports ={
    requiredLogin,
    authorizeAdminOrlibrarian
}