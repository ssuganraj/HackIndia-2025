import img from "../Assets/logo.png";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import nodeAPI from "../NodeAPI"


function LoginPage() {
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);

    useEffect(() => {
        const handleResize = () => setIsLargeScreen(window.innerWidth > 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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
        nodeAPI.post("/auth/login",{
            email: formData.email,
            password: formData.password,
        }).then((response) => {
            console.log(response.data.message);
        })
        // Add your form submission logic here
    };


    return (
        <div className="w-screen h-screen bg-zinc-100 flex justify-center items-center">
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
                                value={formData.password} // ✅ Fixed value here
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
