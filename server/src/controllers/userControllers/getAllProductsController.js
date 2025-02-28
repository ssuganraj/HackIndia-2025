const productModel = require("./../../models/ProductModel")

const getAllProductsController = async(req,res)=>{
    const products = await productModel.find();
    const approvedProducts = products.filter((element) => element.status === "Approved");
    res.status(200).json({products : approvedProducts})
}
module.exports = getAllProductsController