const jwt = require('jsonwebtoken');

const generateToken = ( data ) =>{
    return jwt.sign( {data}, process.env.SECRET_KEY,{
         expiresIn:'1h'
    }) ;
}

module.exports = generateToken ;