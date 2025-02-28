const express = require("express");
const router = express.Router();
const signUpController = require("./../controllers/authControllers/signUpController");
const loginInController = require("./../controllers/authControllers/loginController")
const otpVerifyController = require("./../controllers/authControllers/otpVerificationController");


router.post("/signup",  signUpController)
router.post("/login", loginInController)
router.post("/otpGenerate",otpVerifyController)

module.exports = router