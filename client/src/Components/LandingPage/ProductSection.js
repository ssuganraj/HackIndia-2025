import { motion } from "framer-motion";
import FarmProductCard from "../FarmProductCard";
import NodeAPI from "../../NodeAPI";
import { Buffer } from 'buffer';
import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";

function ProductSection() {

    useEffect(()=>{
        getData()
    },[])
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

    const [products,setProducts] = useState([
        { name: "Apple", description: "Farm fresh apples", price: "₹89", image: "https://picsum.photos/300/300" },
        { name: "Banana", description: "Organic ripe bananas", price: "₹49", image: "https://picsum.photos/300/300" },
        { name: "Carrot", description: "Crunchy and sweet carrots", price: "₹39", image: "https://picsum.photos/300/300" },
        { name: "Tomato", description: "Juicy farm-grown tomatoes", price: "₹59", image: "https://picsum.photos/300/300" },
        { name: "Potato", description: "Freshly harvested potatoes", price: "₹35", image: "https://picsum.photos/300/300" },
        { name: "Spinach", description: "Nutrient-rich organic spinach", price: "₹25", image: "https://picsum.photos/300/300" },
        { name: "Mango", description: "Sweet and juicy mangoes", price: "₹99", image: "https://picsum.photos/300/300" },
        { name: "Strawberry", description: "Delicious and fresh strawberries", price: "₹129", image: "https://picsum.photos/300/300" },
        { name: "Cucumber", description: "Hydrating and crisp cucumbers", price: "₹45", image: "https://picsum.photos/300/300" }
    ]);
    
    async function getData(){
        try{
            NodeAPI.get("/user/getAllProducts").then((response) => {
                const products = []
                const data = response.data.products;
                data.forEach(element => {
                    products.push({
                        name : element.productName,
                        description : element.productDescription,
                        price : element.price,
                        img : element.image && element.image.data ? 
                    `data:image/jpeg;base64,${Buffer.from(element.image.data.data).toString("base64")}` : "",
                    })
                });
                setProducts(products)
            })
        }catch(e){
            console.log(e)
        }
        
        
    }
    return (
        <div className="w-screen min-h-screen bg-zinc-300 p-3">
            <p className="text-center text-3xl text-primary font-bold">Available Products</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 overflow-hidden">

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
        </div>
    );
}

export default ProductSection;
