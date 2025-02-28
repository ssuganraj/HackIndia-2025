const express = require("express")
const router = express.Router()

const getAllProductsController = require("./../controllers/userControllers/getAllProductsController")

router.get("/getAllProducts",getAllProductsController);

module.exports = router