import React, { useState } from 'react';

const FarmProductCard = ({ product }) => {
    const [isHovered, setIsHovered] = useState(false);

    // For touch devices
    const [isTouched, setIsTouched] = useState(false);

    // Touch handler for mobile devices
    const handleTouch = () => {
        setIsTouched(!isTouched);
    };

    // Default product if none is provided
    const defaultProduct = {
        name: "Organic Vegetables",
        description: "Farm-fresh organic vegetables harvested daily from our local farms.",
        price: "$12.99",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=870&q=80"
    };

    const { name, description, price, image } = product || defaultProduct;

    return (
        <div
            className="relative w-full max-w-xs mx-auto overflow-hidden bg-white rounded-lg shadow-[0px_0px_10px] hover:shadow-[6   px_6px_6px] shadow-zinc-800 transition-all duration-300 transform  hover:scale-105 sm:mx-0 border  hover:shadow-zinc-800"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={handleTouch}
        >
            {/* Product Image */}
            <div className="overflow-hidden h-40 sm:h-48 flex items-center justify-center">
                <img
                    src={image}
                    alt={name}
                    className={`object-cover w-[90%] h-[90%] transition-transform duration-500 rounded ${(isHovered || isTouched) ? 'scale-110' : ''}`}
                />
            </div>

            {/* Content Container */}
            <div className="p-3 sm:p-4">
                <h3 className={`mb-1 sm:mb-2 text-lg sm:text-xl font-bold transition-colors duration-300 ${(isHovered || isTouched) ? 'text-primary' : 'text-gray-800'}`}>
                    {name}
                </h3>
                <p className="mb-3 sm:mb-4 text-xs sm:text-sm text-gray-600">{description}</p>

                {/* Price and Add to Cart */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <span className="text-base sm:text-lg font-semibold text-secondary">{price}</span>
                    <button className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-secondary transition-all bg-transparent border-2 border-primary rounded-lg w-full sm:w-auto focus:ring-2 hover:bg-primary hover:text-white z-10">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FarmProductCard;