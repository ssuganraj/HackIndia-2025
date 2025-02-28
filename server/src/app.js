const express = require("express");
const app = express();
const cors = require("cors");
const cookie_parse = require("cookie-parser")
const verifyToken = require("./../src/middleware/tokenAutherization")


const authRouter = require("./../src/routes/authRoutes")

app.use(cookie_parse())
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))

app.use("/auth",authRouter)
app.get("/getRole",verifyToken,(req,res)=>{
    res.status(200).json({role : req.user.role});
})


module.exports = app