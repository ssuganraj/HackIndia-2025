const userLoginModel = require("./../../models/UserLoginModel")
const jwt = require("jsonwebtoken");

const signUpController = async(req, res) =>{
    try{
        const {otp, email} = req.body;
        const user = await userLoginModel.findOne({email})
        const result = user.otp === otp;

        console.log(user.otp, otp)
        if(!result){
            res.status(403).send({message : "otp incorrect"})
        }

        const token = jwt.sign(
            { email: email, role: user.role },   // Payload
            process.env.JWT_SCRT,               // Secret Key
            { expiresIn: '1h' }                 // Options
        );

        res.cookie("jwtToken", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 60 * 60 * 1000
        });
        res.status(200).send({message:"otp verification success"})
    }catch(err){
        console.log(err);
        res.status(500).send({message:"internal server error"})
    }

}

module.exports = signUpController;