const express = require("express");
const router = express.Router();

const { addProductController, upload } = require("./../controllers/farmerControllers/addProductController");
const verifyToken = require("./../middleware/tokenAutherization")


router.post("/addProduct", verifyToken , upload.single("image"),addProductController)

module.exports = router;