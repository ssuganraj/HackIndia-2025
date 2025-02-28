const Product = require("./../../models/ProductModel");
const multer = require("multer");

// Use Memory Storage (for binary image storage in MongoDB)
const upload = multer({ storage: multer.memoryStorage() });

// Add Product Controller
const addProductController = async (req, res) => {
    try {
        console.log("Received product data:", req.body);

        const { productName, productDescription, price, status } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }

        const image = {
            data: req.file.buffer,
            contentType: req.file.mimetype,
        };

        const newProduct = new Product({
            productName,
            productDescription,
            price,
            status: status || "Waiting For Approval",
            image,
            email: req.user.email,
        });

        await newProduct.save();
        res.status(201).json({ message: "Product added successfully!" });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { addProductController, upload };
