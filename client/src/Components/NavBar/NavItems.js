import {Link} from "react-scroll";
import { useNavigate } from "react-router";

function NavItems() {
    const navigate = useNavigate();
    return (
        <>
            <Link
                className="hover:tracking-widest hover:scale-[1.1] transition-all duration-300 cursor-pointer text-[1.2rem] font-[550] hover:text-secondary"
                to="About"
                spy={true}
                smooth={true}
                offset={-70} // Adjusts for navbar height
                duration={500}
                activeClass="active"
            >About</Link>
            <Link
                className="hover:tracking-widest hover:scale-[1.1] transition-all duration-300 cursor-pointer text-[1.2rem] font-[550] hover:text-secondary"
                to="Products"
                spy={true}
                smooth={true}
                offset={-70} // Adjusts for navbar height
                duration={500}
                activeClass="active"
            >Products</Link>
            <Link
                className="hover:tracking-widest hover:scale-[1.1] transition-all duration-300 cursor-pointer text-[1.2rem] font-[550] hover:text-secondary"
                to="Contact"
                spy={true}
                smooth={true}
                offset={-70} // Adjusts for navbar height
                duration={500}
                activeClass="active"
            >Contact Us</Link>
            <p className="hover:tracking-widest hover:scale-[1.1] transition-all duration-300 cursor-pointer text-[1.2rem] font-[550] hover:text-secondary" onClick={() => navigate("/aiChatBot")}>
                AI ChatBot
            </p>
             <p className="hover:tracking-widest hover:scale-[1.1] transition-all duration-300 cursor-pointer text-[1.2rem] font-[550] hover:text-secondary" onClick={() => navigate("/airQuality")}>
                AirQuality
            </p>
            {/*<a*/}
            {/*    className="hover:tracking-widest hover:scale-[1.1] transition-all duration-300 cursor-pointer text-[1.2rem] font-[550]"*/}
            {/*    href="/login"*/}
            {/*    target="_blank"*/}
            {/*>Try It Out</a>*/}
        </>
    )
}
export default NavItems