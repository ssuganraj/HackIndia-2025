const express = require("express");
const router = express.Router();

const { addProductController, upload } = require("./../controllers/farmerControllers/addProductController");
const verifyToken = require("./../middleware/tokenAutherization")
const getProductController = require("./../controllers/farmerControllers/getProductController")


router.post("/addProduct", verifyToken , upload.single("image"),addProductController)
router.get("/getProduct",verifyToken, getProductController)
module.exports = router