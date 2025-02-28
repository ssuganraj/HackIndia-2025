import {IoMdClose} from "react-icons/io";
import {AnimatePresence, motion} from "framer-motion";
import { Link } from "react-scroll";
import NavItems from "./NavItems";

function SideBar({navLinks, closeMenu}) {
    const layer1Variant={
        hidden: { x: "-100%"},
        visible: {
            x: 0,
            transition: { duration: 2, ease: "easeInOut"},
        },
        exit:{
            x: "-100%",
            transition: { duration: 2, ease: "easeInOut" },
        }
    }
    const layer2Variant={
        hidden: { x: "-100%"},
        visible: {
            x: 0,
            transition: { duration: 2, ease: "easeInOut" },
        },
        exit:{
            x: "-100%",
            transition: { duration: 1, ease: "easeOut" },
        }
    }
    return(
        <AnimatePresence>
            <div>
                <motion.div className="fixed w-full h-screen bg-base-200 bg-opacity-85 top-0 left-0 z-[998] bg-zinc-100 opacity-95" variants={layer1Variant} initial="hidden" animate="visible" exit="exit">
                    <motion.div className="fixed w-[50vw] h-screen bg-base-200  bg-opacity-95 top-0 left-0 z-[999] flex justify-center items-center border-primary border-r-[1px] bg-zinc-200" variants={layer2Variant} initial="hidden" animate="visible" exit="exit">
                        <IoMdClose className={"absolute right-5 h-6 w-6 top-5"} onClick={closeMenu}/>
                        <div className="flex flex-col items-center justify-center h-[50vh] justify-evenly items-center">
                            <Link
                                className="hover:tracking-widest hover:scale-[1.1] transition-all duration-300 cursor-pointer text-[1.2rem] font-[550]"
                                to="About"
                                spy={true}
                                smooth={true}
                                offset={-70} // Adjusts for navbar height
                                duration={500}
                                activeClass="active"
                            >About</Link>
                            <Link
                                className="hover:tracking-widest hover:scale-[1.1] transition-all duration-300 cursor-pointer text-[1.2rem] font-[550]"
                                to="Products"
                                spy={true}
                                smooth={true}
                                offset={-70} // Adjusts for navbar height
                                duration={500}
                                activeClass="active"
                            >Products</Link>
                            <Link
                                className="hover:tracking-widest hover:scale-[1.1] transition-all duration-300 cursor-pointer text-[1.2rem] font-[550]"
                                to="Contact"
                                spy={true}
                                smooth={true}
                                offset={-70} // Adjusts for navbar height
                                duration={500}
                                activeClass="active"
                            >Contact Us</Link>
                            <button className="px-4 py-2 bg-primary text-white rounded-lg transition hover:bg-[#234722] hover:-rotate-6 hover:scale-110 ">
                                Login
                            </button>

                            <button className="px-4 py-2 bg-secondary text-white rounded-lg transition hover:bg-[#5A873E] hover:scale-110 hover:rotate-6">
                                SignUp
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

        </AnimatePresence>

    )
}
export default SideBar;