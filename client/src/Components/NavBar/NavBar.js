import { GiHamburgerMenu } from "react-icons/gi";
import {motion} from "framer-motion";
import {useEffect, useState} from "react";
import SideBar from "./SideBar";
import NavItems from "./NavItems";
import { Link, useNavigate } from "react-router-dom";


function NavBar(){
    const navigate = useNavigate();
    const itemVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 2,
            transition: { duration: 2, ease: "easeOut" },
        },
        exit: { scale: 0, opacity: 0, transition: { duration: 0.2 } },
    };

    const [openMenuFlag, setOpenMenuFlag] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);



    useEffect(() => {
        // Function to update windowWidth state
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        // Add event listener for resize event
        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const navLinks = [
        { title: 'About', href: 'about' },
        { title: 'Products', href: 'product' },
        { title: 'Contact Us', href: 'contact_us' },
    ];

    const closeMenu = ()=>{
        setOpenMenuFlag(false);
    }
    useEffect(() => {
        console.log(openMenuFlag);
    },[openMenuFlag]);
    return(
        <>
            {
                openMenuFlag && <SideBar navLinks={navLinks} closeMenu={closeMenu}/>
            }
            <div className="w-screen fixed top-0 flex justify-evenly items-center z-[20] bg-gray-300" >
                <motion.div className=" text-primary px-2 py-2 lg:px-4 lg:py-2  rounded-xl" variants={itemVariants} whileInView="visible" initial="hidden">
                    <Link className="hover:text-[1.2rem] transition-all duration-300 cursor-pointer text-[1rem] lg:text-[1.2rem] font-[800] "
                          to="home"
                          spy={true}
                          smooth={true}
                          offset={-70} // Adjusts for navbar height
                          duration={500}
                          activeClass="active">Pasumai Cholai
                    </Link>
                </motion.div>
                {
                    windowWidth > 789
                    &&
                    <motion.div className="flex justify-evenly items-center gap-2 px-4 py-2 rounded-xl w-[40%]   text-primary lg:px-4 lg:py-2 " variants={itemVariants} whileInView="visible" initial="hidden">
                        <NavItems />
                    </motion.div>
                }
                {
                    windowWidth > 789
                    &&
                    <motion.div className="flex justify-evenly items-center gap-2  px-4 py-2 bg-opacity-60  rounded-xl w-[10%] z-[99]" variants={itemVariants} whileInView="visible" initial="hidden">


                            <button className="px-4 py-2 bg-primary text-white rounded-lg transition hover:bg-[#234722] hover:-rotate-6 hover:scale-110" onClick={()=> navigate("/login")}>
                                Login
                            </button>





                            <button className="px-4 py-2 bg-secondary text-white rounded-lg transition hover:bg-[#5A873E] hover:scale-110 hover:rotate-6" onClick={()=> navigate("/signup")}>
                                SignUp
                            </button>



                    </motion.div>
                }
                {
                    windowWidth < 789 && !openMenuFlag &&
                    <div className="flex justify-evenly items-center gap-2 bg-base-100 px-4 py-2  text-primary lg:px-4 lg:py-2 " onClick={()=> setOpenMenuFlag(true)}>
                        <GiHamburgerMenu />
                    </div>
                }

            </div>
        </>

    )
}
export default NavBar;