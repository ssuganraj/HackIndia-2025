const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    productDescription: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, default: "Waiting For Approval" },
    image: {
        data: Buffer,
        contentType: String,
    },
    email: { type: String, required: true }, 
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
