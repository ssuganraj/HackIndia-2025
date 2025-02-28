const productModel = require("./../../models/ProductModel")
const updateProductStatus = async (req, res) => {
    const {id, status} = req.body;
    console.log(id, status)
    try {
        const updatedProduct = await productModel.findOneAndUpdate({ _id: id }, { status: status }, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product status updated successfully!" }) ;
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = updateProductStatus