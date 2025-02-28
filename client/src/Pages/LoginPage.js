import img from "../Assets/logo.png";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import nodeAPI from "../NodeAPI";
import {useNavigate} from "react-router-dom";
import Notification from "../Components/Notification";

function LoginPage() {
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);
    const [messageFlag, setMessageFlag] = useState(false);
    const [statusCode, setStatusCode] = useState(401);
    const [notificationMessage, setNotificationMessage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => setIsLargeScreen(window.innerWidth > 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Fix: The dependency array should include messageFlag
    useEffect(() => {
        if (notificationMessage) {
            setMessageFlag(true);
        }
    }, [notificationMessage]);

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

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatusCode(404);
        setNotificationMessage("Checking Credentials...");
        setMessageFlag(true);

        nodeAPI.post("/auth/login", {
            email: formData.email,
            password: formData.password,
        })
            .then((response) => {
                setStatusCode(200);
                setNotificationMessage("Credentials Correct");
                navigate("/dashboard");
            })
            .catch((error) => {
                // Fix: Use error.response to access status code
                if (error.response) {
                    if (error.response.status === 404) {
                        setStatusCode(400);
                        setNotificationMessage("Email Not Found!!");
                    } else if (error.response.status === 401) {
                        setStatusCode(500);
                        setNotificationMessage("Password Incorrect!");
                    } else if (error.response.status === 500) {
                        setStatusCode(500);
                        setNotificationMessage("Internal Server Issue");
                    }
                } else {
                    setStatusCode(500);
                    setNotificationMessage("Network Error");
                }
            })
            .finally(() => {
                setTimeout(() => {
                    setMessageFlag(false);
                }, 2000); // Fix: Removed unnecessary array
            });
    };

    return (
        <div className="w-screen h-screen bg-zinc-100 flex justify-center items-center">
            {messageFlag && <Notification message={notificationMessage} statusCode={statusCode} />}

            <motion.div
                className="flex items-center justify-evenly w-full h-full"
                variants={itemLeftVariants}
                whileInView="visible"
                initial="hidden"
            >
                {isLargeScreen && (
                    <div className="flex w-[45%] h-[90%] items-center justify-center">
                        <img src={img} alt="Logo" />
                    </div>
                )}

                <motion.div
                    className="flex w-[100%] lg:w-[45%] h-[90%] items-center justify-center flex-col flex-wrap p-4"
                    variants={itemRightVariants}
                    whileInView="visible"
                    initial="hidden"
                >
                    <p className="font-header text-3xl text-center w-full mb-2 text-primary font-[800]">
                        Login
                    </p>
                    <form onSubmit={handleSubmit} className="w-full lg:w-[80%]">
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Your email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Your Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            Login
                        </button>
                    </form>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default LoginPage;