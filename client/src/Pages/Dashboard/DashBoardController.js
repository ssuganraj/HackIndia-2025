import {useEffect, useState} from "react";
import nodeAPI from "./../../NodeAPI";
import {useNavigate} from "react-router-dom";
import AdminDashBoard from "./AdminDashBoard";
import FarmerDashboard from "./FarmerDashboard";
import UserDashBoard from "./UserDashBoard";

function DashBoardController() {
    const navigate = useNavigate();
    const [role,setRole]=useState("");
    useEffect(()=>{
        nodeAPI.get("/getRole").then((response) => {
            setRole(response.data.role)
            console.log(response.data.role);
        }).catch((error) => {
            navigate("/page404")
        })
    },[])
    return (
        <>
            {
                role === "admin" ? (
                    <AdminDashBoard />
                ) : role === "farmer" ? (
                    <FarmerDashboard />
                ) : 
                    <UserDashBoard />
                
            }
        </>
    )
}
export default DashBoardController;