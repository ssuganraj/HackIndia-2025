const express = require("express")
const router = express.Router()

const addProductController = require("./../controllers/adminControllers/getAllDetailsContoller")
const updateProductStatusController = require("./../controllers/adminControllers/updateProductStatus")
const { verify } = require("crypto")

router.get("/getAllProducts",verify,addProductController)
router.post("/updateProductStatus",verify,updateProductStatusController)

module.exports = router