const productModel = require("./../../models/ProductModel")

const getProductController = async(req,res) => {
    const email = req.user.email;
    console.log(email)
    const products = await productModel.find({email})

    
    res.status(200).json({products : products} )
}

module.exports = getProductController