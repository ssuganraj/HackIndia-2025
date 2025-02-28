const userLoginModel = require("../../models/UserLoginModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginController = async(req,res)=>{

    const {email,password} = req.body;
    console.log(email)
    
    const userDetails = await userLoginModel.findOne({email});
    if(!userDetails){
        res.status(404).send({message : "not found"});
    }
    const result = await bcrypt.compare(password, userDetails.password);
    if(!result){
        res.status(401).send({message : "password incorrect"});
    }
    const token = jwt.sign({email : userDetails.email, role : userDetails.role},process.env.JWT_SCRT,{expiresIn: '1h'});
    res.cookie("jwtToken", token, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        maxAge: 60 * 60 * 1000
    });

    res.status(200).send({message:"success", role : userDetails.role});
}

module.exports = loginController