import img from "./../Assets/page404.jpg"
import {useNavigate} from "react-router-dom";

function Page404() {
    const navigate = useNavigate();
    return(
        <div className="flex justify-center items-center w-screen h-screen flex-col">
            <p className="text-2xl font-bold text-primary">UnAutherized Access</p>
            <img src={img} />
            <button
                className="px-4 py-2 bg-primary text-white rounded-lg transition hover:bg-[#234722] hover:-rotate-6 hover:scale-110"
                onClick={() => navigate("/")}
            >
                Home
            </button>
        </div>
    )
}
export default Page404;