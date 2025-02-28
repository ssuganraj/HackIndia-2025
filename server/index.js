const app = require("./src/app")
const express = require("express")
const dbConnect = require("./src/configs/dbConnection.js")


app.use(express.json())


dbConnect()

app.listen(5001,()=>{
    console.log("server is running on port 5001")
})