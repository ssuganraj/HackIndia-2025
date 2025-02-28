const express = require("express");
const app = express();
const cors = require("cors");
const cookie_parse = require("cookie-parser")
const verifyToken = require("./../src/middleware/tokenAutherization")
const farmerRouter = require("./routes/farmerRoutes")

const authRouter = require("./../src/routes/authRoutes")

app.use(cookie_parse())
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))

app.use("/auth",authRouter)
app.use("/farmer",farmerRouter)


app.get("/getRole",verifyToken,(req,res)=>{
    res.status(200).json({role : req.user.role});
})

app.delete("/logout", verifyToken, (req, res) => {
    res.clearCookie("jwtToken", { httpOnly: true, secure: true, sameSite: "none" });
    res.status(200).json({ message: "Logout successful" });
});



module.exports = app