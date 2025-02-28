import img from "../../Assets/logo.png"
import {motion} from "framer-motion";

function AboutSection(){
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

    return (
        <div className="w-screen min-h-screen bg-zinc-100 flex justify-center items-center ">
            <div className="flex flex-col lg:flex-row items-center justify-evenly w-full h-full p-4">
                <motion.div className="flex w-[100%]  lg:w-[45%] h-[50%] lg:h-[90%]   items-center justify-center " variants={itemLeftVariants} whileInView="visible" initial="hidden">
                    <img className="" src={img} />
                </motion.div>
                <motion.div className="flex w-[100%] lg:w-[45%] h-[50%] lg:h-[90%]  items-center justify-center lg:flex-col flex-wrap p-4" variants={itemRightVariants} whileInView="visible" initial="hidden">
                    <p className="font-header text-5xl text-center lg:text-left w-full mb-2 text-primary font-[800]">About Us</p>
                    <p className="text-xl font-[400]">
                        <span className="text-soil font-[600]">PASUMAI CHOLAI</span> is the idea that have been started for farmers who have really struggling to survive in this world. This the website started in the motto of saving the farmers life , to generate the actual correct profit to the farmers. And, I have one question to everyone viewing this website "When the country is said to become as a Developed Nation ?" the actual answer for this question is when farmer dies without money in poverty. "It's not poverty only for that Farmer, That's poverty for the Whole Nation" When we understand this country will be fullfilled with development as much as other countries. And PASUMAI CHOLAI website helps the farmers to get connect with other farmers and experts in this Farm field to stay connect with each other and resolve their problems. And we have E-commerce shopping section in this website by this, we can sell the product which are produced by Farmers its a direct process and a small step that have been taken for the farmers to get their actual profit for the product. In Tamil, their is a quotes <span className="text-soil font-[600]">"உலகத்தில் உயர்ந்தவன் ஒருவன் தான். உழுது, விதைத்து, அறுத்து, உலகத்துக்கே சோறு போடுபவன் தான் உலகத்திலேயே உயர்ந்தவன்."</span> As per, the quotes we are small young-ones started this website to Save Farmers!!! Save World!!!
                    </p>
                </motion.div>
            </div>
        </div>
    )
}
export default AboutSection;