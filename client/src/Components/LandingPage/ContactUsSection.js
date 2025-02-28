import img from "../../Assets/logo.png";
import {useEffect, useState} from "react";
import {motion} from "framer-motion";

function ContactUsSection(){
    const itemLeftVariants = {
        hidden: { x: -100, opacity: 0 },
        visible: {
            x: 0,
            opacity: 2,
            transition: { duration: 2, ease: "easeOut" },
        },
        exit: { x: -100, opacity: 0, transition: { duration: 0.2 } },
    };
    const itemRightVariants = {
        hidden: { x: 100, opacity: 0 },
        visible: {
            x: 0,
            opacity: 2,
            transition: { duration: 2, ease: "easeOut" },
        },
        exit: { x: 100, opacity: 0, transition: { duration: 0.2 } },
    };

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        review: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add your form submission logic here
    };

    return (
        <div className="w-screen min-h-screen flex justify-center items-center bg-zinc-100 overflow-hidden">
            <motion.div className="flex items-center justify-evenly w-full h-full "  variants={itemLeftVariants} whileInView="visible" initial="hidden">
                {
                    window.innerWidth > 768 &&
                    <div className="flex w-[45%] h-[90%]   items-center justify-center ">
                        <img className="" src={img} />
                    </div>
                }

                <motion.div className="flex w-[100%] lg:w-[45%] h-[90%]  items-center justify-center flex-col flex-wrap p-4" variants={itemRightVariants} whileInView="visible" initial="hidden">
                    <p className="font-header text-3xl text-center  w-full mb-2 text-primary font-[800]">Contact US</p>
                    <form onSubmit={handleSubmit} className="w-full lg:w-[80%]" >
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Your name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
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
                            <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                                Phone
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="Your phone number"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="review" className="block text-gray-700 text-sm font-bold mb-2">
                                Review
                            </label>
                            <textarea
                                id="review"
                                name="review"
                                placeholder="Write your review here..."
                                value={formData.review}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            Submit Review
                        </button>
                    </form>
                </motion.div>
            </motion.div>
        </div>
    )
}
export default ContactUsSection;