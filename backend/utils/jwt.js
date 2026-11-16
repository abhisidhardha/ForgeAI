/** Server-side JWT signing and verification. Browser decoding alone never authorizes an API request. */
const jwt = require('jsonwebtoken');

const signToken = (payload) => jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'3d'});

const verifyToken = (token) => {
    try{
        return jwt.verify(token,process.env.JWT_SECRET);
    }catch{
        return null ;
    }

}


module.exports = {signToken,verifyToken};
