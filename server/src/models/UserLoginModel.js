const mongoose = require("mongoose");

const UserLoginSchema = new mongoose.Schema({
    email : String,
    password : String,
    otp : String,
    phoneNumber : String,
    role : {
        type:String,
        enum : ["farmer","expert","admin","user"]
    }
})

const userLoginModel = mongoose.model("userlogin",UserLoginSchema);

module.exports = userLoginModel