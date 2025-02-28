const jwt = require('jsonwebtoken')
require('dotenv').config()

const tokenVerification = (req, res, next) => {
    const token = req.cookies?.jwtToken || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message : "Token missing"})
    }
    jwt.verify(token, process.env.JWT_SCRT, (err, decoded) => {
        if(err) return res.status(404).json({message : "Token invalid ", error: err})
        req.user = decoded;
        next()
    })
}

module.exports = tokenVerification;