import { motion } from "framer-motion";

function Notification({ statusCode, message }) {
    const itemVariants = {
        hidden: { x: 50, opacity: 0 }, // Slide in from the right instead of left
        visible: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" },
        },
        exit: { x: 50, opacity: 0, transition: { duration: 0.2 } },
    };

    return (
        <motion.div
            className={`fixed top-20 right-10 w-[50vw] lg:w-[20vw] p-4 text-white rounded-lg shadow-lg ${
                statusCode === 200
                    ? "bg-green-500"
                    : [401, 403, 404].includes(statusCode)
                        ? "bg-blue-500"
                        : "bg-red-500"
            } `}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <p className="text-sm font-medium text-center">{message}</p>
        </motion.div>
    );
}

export default Notification;
