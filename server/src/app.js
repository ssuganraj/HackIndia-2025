const express = require("express");
const app = express();
const cors = require("cors");
const cookie_parse = require("cookie-parser")


const authRouter = require("./../src/routes/authRoutes")

app.use(cookie_parse())
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))

app.use("/auth",authRouter)


module.exports = app