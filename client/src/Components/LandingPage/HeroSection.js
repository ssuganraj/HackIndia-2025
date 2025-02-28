import bgImg from "../../Assets/backgroundImage.jpg"
import {motion} from "framer-motion";
function HeroSection() {
    const itemVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 2,
            transition: { duration: 2, ease: "easeOut" },
        },
        exit: { scale: 0, opacity: 0, transition: { duration: 0.2 } },
    };
    return (
        <div className="w-screen min-h-screen relative overflow-hidden ">
            <img src={bgImg}
                 alt="Background"
                 className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white drop-shadow-lg">
                <motion.p variants={itemVariants} whileInView="visible" initial="hidden"
                          exit="exit"  className="width-full">
                    {
                        ['P','a','s','u','m','a','i',' ','c','h','o','l','a','i'].map((character,index) =>(
                            <span className="text-8xl font-extrabold drop-shadow-[0_4px_10px_rgba(0,0,0,1)] hover:text-7xl hover:p-1 transition-all duration-300 cursor-pointer">{character}</span>
                        ))
                    }
                </motion.p>

                <motion.p className="text-2xl italic font-semibold mt-2 drop-shadow-[0_4px_10px_rgba(0,0,0,1)]" variants={itemVariants} whileInView="visible" initial="hidden"
                          exit="exit" >
                    Agriculture is a way of life, not a profession - G. Nammazhvar
                </motion.p>
            </div>

        </div>
    )
}
export default HeroSection;