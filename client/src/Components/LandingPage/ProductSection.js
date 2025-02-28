import { motion } from "framer-motion";
import FarmProductCard from "../FarmProductCard";

function ProductSection() {
    const itemLeftVariants = {
        hidden: { x: -100, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 2, ease: "easeOut" } },
        exit: { x: -100, opacity: 0, transition: { duration: 0.2 } },
    };

    const itemRightVariants = {
        hidden: { x: 100, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 2, ease: "easeOut" } },
        exit: { x: 100, opacity: 0, transition: { duration: 0.2 } },
    };

    const itemMiddleVariants = {
        hidden: { y: 10, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 2, ease: "easeOut" } },
        exit: { y: 10, opacity: 0, transition: { duration: 0.2 } },
    };

    const products = [
        { name: "Apple", description: "Farm fresh apples", price: "₹89", image: "https://picsum.photos/300/300" },
        { name: "Banana", description: "Organic ripe bananas", price: "₹49", image: "https://picsum.photos/300/300" },
        { name: "Carrot", description: "Crunchy and sweet carrots", price: "₹39", image: "https://picsum.photos/300/300" },
        { name: "Tomato", description: "Juicy farm-grown tomatoes", price: "₹59", image: "https://picsum.photos/300/300" },
        { name: "Potato", description: "Freshly harvested potatoes", price: "₹35", image: "https://picsum.photos/300/300" },
        { name: "Spinach", description: "Nutrient-rich organic spinach", price: "₹25", image: "https://picsum.photos/300/300" },
        { name: "Mango", description: "Sweet and juicy mangoes", price: "₹99", image: "https://picsum.photos/300/300" },
        { name: "Strawberry", description: "Delicious and fresh strawberries", price: "₹129", image: "https://picsum.photos/300/300" },
        { name: "Cucumber", description: "Hydrating and crisp cucumbers", price: "₹45", image: "https://picsum.photos/300/300" }
    ];

    return (
        <div className="w-screen min-h-screen bg-zinc-300 grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 overflow-hidden">
            {products.map((product, index) => (
                <motion.div
                    key={index}
                    className="p-6 text-white text-center h-full flex justify-center items-center"
                    variants={index % 3 === 1 ? itemMiddleVariants : index % 3 === 2 ? itemRightVariants : itemLeftVariants}
                    initial="hidden"
                    whileInView="visible"
                    exit="exit"
                >
                    <FarmProductCard product={product} />
                </motion.div>
            ))}
        </div>
    );
}

export default ProductSection;
