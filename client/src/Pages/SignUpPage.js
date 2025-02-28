import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import img from "../Assets/logo.png";
import nodeAPI from "./../NodeAPI"
import Notification from "../Components/Notification";
import {useNavigate} from "react-router-dom";

function SignUpPage() {
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);
    const [otpVerificationFlag, setOtpVerificationFlag] = useState(false);
    const [phoneError, setPhoneError] = useState("");
    const [messageFlag, setMessageFlag] = useState(false);
    const [statusCode, setStatusCode] = useState(401);
    const [notificationMessage, setNotificationMessage] = useState(null);
    const navigate = useNavigate();

    const itemLeftVariants = {
        hidden: { x: -100, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { duration: 2, ease: "easeOut" },
        },
        exit: { x: -100, opacity: 0, transition: { duration: 0.2 } },
    };

    const itemRightVariants = {
        hidden: { x: 100, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { duration: 2, ease: "easeOut" },
        },
        exit: { x: 100, opacity: 0, transition: { duration: 0.2 } },
    };


    useEffect(() => {
        const handleResize = () => setIsLargeScreen(window.innerWidth > 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        phoneNumber: "",
        role: "farmer",
        otp: ""
    });

    useEffect(() => {
        if (notificationMessage) {
            setMessageFlag(true);
        }
    }, [notificationMessage]);

    const validatePhoneNumber = (number) => {
        const phonePattern = /^[6-9]\d{9}$/;
        return phonePattern.test(number);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (name === "phoneNumber") {
            if (!validatePhoneNumber(value)) {
                setPhoneError("Enter a valid 10-digit Indian phone number");
            } else {
                setPhoneError("");
            }
        }
    };

    const handleOtpGenerate = (e) => {
        e.preventDefault();
        if (!validatePhoneNumber(formData.phoneNumber)) {
            setPhoneError("Enter a valid 10-digit Indian phone number");
            return;
        }
        setStatusCode(404);
        setNotificationMessage("Generating OTP...");
        nodeAPI.post("/auth/otpGenerate",{
            phoneNumber: formData.phoneNumber,
            email: formData.email,
            password: formData.password,
            role: formData.role,
        }).then((res) => {
            console.log(res.data.message);
            setOtpVerificationFlag(true);
        }).catch((error) => {
            if (error.response) {
                if (error.response.status === 401) {
                    setStatusCode(401);
                    setNotificationMessage("User Already Exists");
                } else if (error.response.status === 500) {
                    setStatusCode(500);
                    setNotificationMessage("Internal Server Issue");
                }
            } else {
                setStatusCode(500);
                setNotificationMessage("Network Error");
            }
        })

    };

    const handleSignUp = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        nodeAPI.post("/auth/signup",{
            email: formData.email,
            otp:formData.otp
        }).then(res =>{
            setStatusCode(200);
            setNotificationMessage("Otp Verification Successful");
            navigate("/dashboard");
        }).catch(error =>{
            if (error.response) {
                if (error.response.status === 403) {
                    setStatusCode(500);
                    setNotificationMessage("OTP Incorrect");
                } else if (error.response.status === 500) {
                    setStatusCode(500);
                    setNotificationMessage("Internal Server Issue");
                }
            } else {
                setStatusCode(500);
                setNotificationMessage("Network Error");
            }
        })
    };

    return (
        <div className="w-screen h-screen bg-zinc-100 flex justify-center items-center">
            {messageFlag && <Notification message={notificationMessage} statusCode={statusCode} />}
            <motion.div className="flex items-center justify-evenly w-full h-full" variants={itemLeftVariants} initial="hidden" whileInView="visible" exit="exit">
                {isLargeScreen && (
                    <div className="flex w-[45%] h-[90%] items-center justify-center">
                        <img src={img} alt="Logo" />
                    </div>
                )}

                <motion.div className="flex w-[100%] lg:w-[45%] h-[90%] items-center justify-center flex-col flex-wrap p-4" variants={itemRightVariants} initial="hidden" whileInView="visible" exit="exit">
                    <p className="font-header text-3xl text-center w-full mb-2 text-primary font-[800]">SignUp</p>
                    <form onSubmit={otpVerificationFlag ? handleSignUp : handleOtpGenerate} className="w-full lg:w-[80%]">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                            <input type="email" name="email" placeholder="Your email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" required />
                        </div>

                        {!otpVerificationFlag && (
                            <>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                                    <input type="password" name="password" placeholder="Your Password" value={formData.password} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" required />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                                    <input type="number" name="phoneNumber" placeholder="Your Phone Number" value={formData.phoneNumber} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" required />
                                    {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
                                    <select name="role" value={formData.role} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                                        <option value="farmer">Farmer</option>
                                        <option value="expert">Expert</option>
                                        <option value="user">User</option>
                                    </select>
                                </div>

                                <button type="submit" disabled={phoneError} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500">
                                    OTP Generate
                                </button>
                            </>
                        )}

                        {otpVerificationFlag && (
                            <>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">OTP</label>
                                    <input type="text" name="otp" placeholder="Enter OTP" value={formData.otp} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" required />
                                </div>

                                <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500">
                                    SignUp
                                </button>
                            </>
                        )}
                    </form>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default SignUpPage;
