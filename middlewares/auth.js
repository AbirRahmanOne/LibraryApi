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
                  req.userData = {
                      _id: data._id,
                      name: data.name,
                      email: data.email
                  }
                  next(); // go to next function
              }
          });
      }
  };

module.exports =requiredLogin ;