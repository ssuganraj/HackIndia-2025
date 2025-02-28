import { useEffect, useState } from "react";
import nodeAPI  from "../../NodeAPI";
import NavBar from "./../../Components/FarmerNavBar/NavBar";
import { Buffer } from 'buffer';

function FarmerDashboard() {
    const [showForm, setShowForm] = useState(false);
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        productName: "",
        productDescription: "",
        price: "",
        img: null,
        status: "Waiting For Approval",
    });

    async function getData(){
nodeAPI.get("/farmer/getProduct").then((response) => {
            const res = response.data.products;
            const data = res.map(element => ({
                price: element.price,
                productDescription: element.productDescription,
                id: element._id,
                productName: element.productName,
                img: element.image && element.image.data ? 
                    `data:image/jpeg;base64,${Buffer.from(element.image.data.data).toString("base64")}` : "",
                    status : element.status
            }));
            setProducts(data);
            
        }).catch(error => {
            console.error("Error fetching products:", error);
        });
    }
    useEffect(() => {
        getData();
    }, []);
    
    function handleInputChange(e) {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value,
        });
    }

    function handleImageChange(e) {
        const file = e.target.files[0];
        if (file) {
            setFormData({
                ...formData,
                img: file,
            });
        }
    }

    async  function handleSubmit(e) {
        e.preventDefault();
        if (!formData.productName || !formData.productDescription || !formData.price || !formData.img) {
            alert("Please fill in all fields!");
            return;
        }


        try{
            const formDataToSend = new FormData();
            formDataToSend.append("productName", formData.productName);
            formDataToSend.append("productDescription", formData.productDescription);
            formDataToSend.append("price", formData.price);
            formDataToSend.append("status", "Waiting For Approval");
            formDataToSend.append("image", formData.img); // File upload

            // Send request to backend
            const response = await nodeAPI.post("/farmer/addProduct", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
           

            if (response.status === 201) {
                console.log("successfull")
                setShowForm(false);
                getData();
            }
        }catch (e){
            console.log(e);
        }
        setFormData({
            productName: "",
            productDescription: "",
            price: "",
            img: null,
            status: "Waiting For Approval",
        })
        setShowForm(false);

    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <NavBar />
            <div className="flex flex-col p-4 sm:p-6 w-full max-w-6xl mx-auto mt-16 sm:mt-20 mb-8">
                <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
                    <h1 className="text-xl sm:text-2xl font-bold text-primary border-b pb-3 mb-4">Farmer Dashboard</h1>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                        <h2 className="text-lg font-semibold text-gray-700">Product Inventory</h2>
                        <button
                            className="bg-primary hover:bg-primary/90 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200 flex items-center w-full sm:w-auto justify-center sm:justify-start"
                            onClick={() => setShowForm(true)}
                        >
                            + Add Product
                        </button>
                    </div>
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 flex items-center">
                                        {product.img && (
                                            <img src={product.img} alt={product.name} className="w-10 h-10 object-cover rounded-full mr-3" />
                                        )}
                                        <span className="text-sm font-medium text-gray-900">{product.productName}</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{product.productDescription}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">₹{product.price}</td>
                                    <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                product.status === "Approved" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                                            }`}>
                                                {product.status}
                                            </span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-4 sm:p-6 relative">
                        <h3 className="font-semibold text-xl mb-6 text-gray-800">Add A New Product</h3>
                        <form onSubmit={handleSubmit}>
                            <input id="productName" type="text" placeholder="Product Name" className="border p-3 w-full rounded-md mb-3" value={formData.productName} onChange={handleInputChange} required />
                            <textarea id="productDescription" placeholder="Product Description" className="border p-3 w-full rounded-md mb-3" value={formData.productDescription} onChange={handleInputChange} required />
                            <input id="price" type="number" placeholder="Price (₹)" className="border p-3 w-full rounded-md mb-3" value={formData.price} onChange={handleInputChange} required />
                            <input type="file" accept="image/*" className="mt-2" onChange={handleImageChange} required />
                            {formData.img && <img src={formData.img} alt="Preview" className="w-24 h-24 mt-2 rounded-lg" />}
                            <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md w-full mt-3">Add Product</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FarmerDashboard;
