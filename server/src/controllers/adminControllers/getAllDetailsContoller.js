const productModel = require("./../../models/ProductModel");

const getAllDetailsController = async (req, res) => {
    const products = await productModel.find();
    res.status(200).json({ products : products });
}

module.exports = getAllDetailsController