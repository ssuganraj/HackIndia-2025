import { useEffect, useState } from "react";
import nodeAPI from "../../NodeAPI";
import NavBar from "./../../Components/FarmerNavBar/NavBar";
import { Buffer } from 'buffer';

function FarmerDashboard() {
    const [showForm, setShowForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);

    async function getData() {
        nodeAPI.get("/admin/getAllProducts").then((response) => {
            const res = response.data.products;
            const data = res.map(element => ({
                price: element.price,
                productDescription: element.productDescription,
                id: element._id,
                productName: element.productName,
                img: element.image && element.image.data ? 
                    `data:image/jpeg;base64,${Buffer.from(element.image.data.data).toString("base64")}` : "",
                status: element.status
            }));
            setProducts(data);
        }).catch(error => {
            console.error("Error fetching products:", error);
        });
    }

    useEffect(() => {
        getData();
    }, []);

    function handleUpdateClick(product) {
        setSelectedProduct(product);
        setShowForm(true);
    }

    function handleCloseForm() {
        setShowForm(false);
        setSelectedProduct(null);
    }

    function handleStatusChange(e) {
        setSelectedProduct({ ...selectedProduct, status: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            nodeAPI.post("/admin/updateProductStatus", {
                id: selectedProduct.id,
                status: selectedProduct.status
            }).then((response) => {
                console.log(response)
            }).finally( () => {
            getData();
            handleCloseForm();
            })
            
        } catch (error) {
            console.error("Error updating product status:", error);
        }
    }

    return (
        <div className="flex flex-col h-screen w-screen bg-gray-50">
            <NavBar />
            <div className="flex flex-col p-4 sm:p-6 max-w-6xl mx-auto mt-16 sm:mt-20 mb-8 w-screen justify-center items-center">
                <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 w-[90vw]">
                    <h1 className="text-xl sm:text-2xl font-bold text-primary border-b pb-3 mb-4">Admin Dashboard</h1>
                    <h2 className="text-lg font-semibold text-gray-700 text-center mb-3">All Products Available</h2>
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {products.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 flex items-center">
                                            {product.img && (
                                                <img src={product.img} alt={product.productName} className="w-10 h-10 object-cover rounded-full mr-3" />
                                            )}
                                            <span className="text-sm font-medium text-gray-900">{product.productName}</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{product.productDescription}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">₹{product.price}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                product.status === "Approved" ? "bg-green-100 text-green-800" :  product.status  === "Waiting For Approval" ? "bg-yellow-100 text-yellow-800":
                                                "bg-red-100 text-red-800"
                                            }`}>
                                                {product.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                             <button 
                                                onClick={() => handleUpdateClick(product)} 
                                                className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-800 rounded-lg transition duration-300 ease-in-out shadow-md">
                                                Update Status
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {showForm && selectedProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4 w-screen">
                    <div className="bg-white rounded-lg shadow-xl w-[50%]  p-6 relative">
                        <h3 className="font-semibold text-xl mb-6 text-gray-800">Update Product Status</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <p className="text-xl font-medium text-gray-700">Product Name: <span className="text-2xl font-semibold">{selectedProduct.productName}</span>
                                </p>
                                
                            </div>
                            <div className="mb-4">
                                <p className="text-xl font-medium text-gray-700">Description:  
                                    <span className="text-2xl font-semibold"> {selectedProduct.productDescription}</span>
                                </p>
                                
                            </div>
                            <div className="mb-4">
                                <p className="text-xl font-medium text-gray-700">Price: 
                                    <span className="text-2xl font-semibold"> ₹{selectedProduct.price}
                                    </span>
                                </p>
                                
                            </div>
                            {selectedProduct.img && (
                                <div className="mb-4">
                                    <img src={selectedProduct.img} alt={selectedProduct.productName} className="w-[200] h-auto rounded-lg" />
                                </div>
                            )}
                            <div className="mb-4">
                                <label className="text-sm font-medium text-gray-700">Status</label>
                                <select value={selectedProduct.status} onChange={handleStatusChange} className="w-full p-2 border border-gray-300 rounded-lg">
                                    <option value="Waiting For Approval">Waiting For Approval</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </div>
                            <div className="flex justify-between">
                                <button type="button" onClick={handleCloseForm} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FarmerDashboard;
