'use client';

import { useState } from 'react';

// Mock data with images
const products = [
    {
        id: 1,
        title: "MacBook Pro M2",
        price: "$1299",
        category: "Laptops",
        image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp14-spaceblack-select-202410?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1728916305295"
    },
    {
        id: 2,
        title: "iPhone 15 Pro",
        price: "$999",
        category: "Smartphones",
        image: "https://www.imagineonline.store/cdn/shop/files/iPhone_15_Pro_Natural_Titanium_PDP_Image_Position-1__en-IN.jpg?v=1694758095&width=1680"
    },
    {
        id: 3,
        title: "Sony WH-1000XM5",
        price: "$399",
        category: "Headphones",
        image: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1669124939/Croma%20Assets/Entertainment/Headphones%20and%20Earphones/Images/262565_0_gsz0tr.png?tr=w-640"
    },
    {
        id: 4,
        title: "Samsung S24 Ultra",
        price: "$1199",
        category: "Smartphones",
        image: "https://m.media-amazon.com/images/I/81njZjDqc6L._SX679_.jpg"
    },
    // Adding more products
    {
        id: 5,
        title: "iPad Pro 12.9",
        price: "$1099",
        category: "Tablets",
        image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/ipad-pro-13-select-wifi-spacegray-202210?wid=470&hei=556&fmt=png-alpha&.v=1664411207213"
    },
    {
        id: 6,
        title: "AirPods Pro",
        price: "$249",
        category: "Audio",
        image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MQD83?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1660803972361"
    },
    {
        id: 7,
        title: "Apple Watch Ultra 2",
        price: "$799",
        category: "Wearables",
        image: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1725993269/Croma%20Assets/Communication/Wearable%20Devices/Images/309297_0_bjgmau.png?tr=w-640"
    },
    {
        id: 8,
        title: "Google Pixel 8 Pro",
        price: "$999",
        category: "Smartphones",
        image: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1724267144/Croma%20Assets/Communication/Mobiles/Images/309158_0_lzrkfj.png?tr=w-640"
    }
];

export default function ProductGrid() {
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    return (
        <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 pb-12">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="group max-w-[450px] relative bg-gradient-to-br from-[#ff00ff] to-[#3700ff] p-[1px] rounded-2xl
                             transition-all duration-300 hover:shadow-[0_0_20px_1px_rgba(204,0,255,0.2)]
                             before:absolute before:inset-[-1px] before:rounded-2xl before:bg-[#0c0c0c] before:z-0
                             hover:before:opacity-0 before:transition-opacity"
                    onMouseEnter={() => setHoveredId(product.id)}
                    onMouseLeave={() => setHoveredId(null)}
                >
                    <div className="h-full w-full bg-[#0c0c0c] rounded-xl overflow-hidden
                                  transition-all ease-in-out duration-1000 group-hover:scale-[0.99] group-hover:rounded-xl">
                        <div className="aspect-square relative overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.title}
                                className={`object-contain p-3 transition-transform duration-300 rounded-xl
                                         ${hoveredId === product.id ? 'scale-110' : 'scale-100'}`}
                                style={{borderRadius: '20px'}}
                            />
                        </div>
                        <div className="p-4 border-t border-[#333333]/20">
                            <h3 className="text-base font-medium mb-1 text-gray-200 line-clamp-1">
                                {product.title}
                            </h3>
                            <p className="text-xs text-gray-400 mb-1">{product.category}</p>
                            <p className="text-primary font-medium text-sm">{product.price}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
} 