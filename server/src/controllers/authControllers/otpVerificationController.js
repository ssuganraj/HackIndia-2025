const userLoginModel = require("./../../models/UserLoginModel")
const bcrypt = require("bcrypt");
const generateOTP = require("./../../utils/otpGeneration")
const nodeMailer = require("./../../utils/nodeMailer")
require("dotenv").config();

const otpVerification = async (req, res) => {
    try{
        const {email, password, role, phoneNumber}  = req.body;

        // const user =await userLoginModel.findOne({email})
        // if(user){
        //     res.status(401).send({message : "user already exists"})
        // }
        const hashPassword = await bcrypt.hash(password, parseInt(process.env.SALT_VALUE));
        const otp = generateOTP();
        const newUser = new userLoginModel({
            email,
            password : hashPassword,
            phoneNumber,
            role,
            otp
        })
        await newUser.save();
        await nodeMailer(email, otp);
        res.status(200).send({message:"otp generated successfully."})
    }catch (e){
        console.log(e);
        res.status(500).send({message:"internal server error"})
    }

}

module.exports = otpVerification;