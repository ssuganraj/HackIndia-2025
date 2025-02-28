import img from "./../Assets/page404.jpg"
function Page404() {
    return(
        <div className="flex justify-center items-center w-screen h-screen flex-col">
            <p className="text-2xl font-bold text-primary">UnAutherized Access</p>
            <img src={img} />
        </div>
    )
}
export default Page404;