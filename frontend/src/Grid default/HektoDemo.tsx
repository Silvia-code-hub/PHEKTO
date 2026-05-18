import React from "react";
import Layout from "../Components/layout";
import { Link } from "react-router-dom";

const HektoDemo: React.FC = () => {
    
    const cartItems = [
        {
            id: 1,
            name: "Ut diam consequat",
            image: "https://res.cloudinary.com/dua4go47y/image/upload/v1777010215/products/image_057.jpg",
            color: "Brown",
            size: "XL",
            price: 32.00
        },
        {
            id: 2,
            name: "Ut diam consequat",
            image: "https://res.cloudinary.com/dua4go47y/image/upload/v1777010219/products/image_061.jpg",
            color: "Brown",
            size: "XL",
            price: 32.00
        },
        {
            id: 3,
            name: "Ut diam consequat",
            image: "https://res.cloudinary.com/dua4go47y/image/upload/v1777010218/products/image_060.jpg",
            color: "Brown",
            size: "XL",
            price: 32.00
        },
        {
            id: 4,
            name: "Ut diam consequat",
            image: "https://res.cloudinary.com/dua4go47y/image/upload/v1777010216/products/image_059.jpg",
            color: "Brown",
            size: "XL",
            price: 32.00
        },
        {
            id: 5,
            name: "Ut diam consequat",
            image: "https://res.cloudinary.com/dua4go47y/image/upload/v1777010216/products/image_058.jpg",
            color: "Brown",
            size: "XL",
            price: 32.00
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Layout>
                
                <div className="max-w-[1200px] mx-auto px-4 py-8">
                  
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-deep-blue mb-2 ">Hekto Demo</h1>
                    </div>

                    
                    <div className="mb-8 pb-4 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-[#151875] mb-1">Hekto Demo</h2>
                        <p className="text-sm text-[#1D3178]">Cart / Information / Shipping / Payment</p>
                    </div>


                    <div className="flex flex-col lg:flex-row gap-8">
                        
                        <div className="flex-1 bg-[#f0f0f1] p-2 m-1">
                           
                            <div className="mb-6 p-1">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold text-[#1D3178]">Contact Information</h3>
                                    <p className="text-sm text-gray-300">
                                        Already have an account? <Link to="/login" className="text-gray-300 hover:underline">Log in</Link>
                                    </p>
                                </div>
                                
                                <div className="mb-4">
                                    <input 
                                        type="email" 
                                        placeholder="Email or mobile phone number" 
                                        className="w-full px-4 py-3 border-b border-b-gray-300 rounded-md focus:outline-none "
                                    />
                                </div>
                                
                                <div className="flex items-center gap-2 mb-6">
                                    <input 
                                        type="checkbox" 
                                        id="keepMeUpdated"
                                        className="w-4 h-4 text-pink-500 rounded border-gray-300 focus:ring-pink-500"
                                    />
                                    <label htmlFor="keepMeUpdated" className="text-sm text-gray-600">
                                        Keep me up to date on news and exclusive offers
                                    </label>
                                </div>
                            </div>

                            
                            <div>
                                <h3 className="text-lg font-semibold text-[#151875] mb-4">Shipping Address</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <input 
                                        type="text" 
                                        placeholder="First name (optional)" 
                                        className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                                    />
                                    <input 
                                        type="text" 
                                        placeholder="Last name" 
                                        className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                                    />
                                </div>
                                
                                <div className="mb-4">
                                    <input 
                                        type="text" 
                                        placeholder="Address" 
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                                    />
                                </div>
                                
                                <div className="mb-4">
                                    <input 
                                        type="text" 
                                        placeholder="Apartment, suite, etc. (optional)" 
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                                    />
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <input 
                                        type="text" 
                                        placeholder="City" 
                                        className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                                    />
                                    <select className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-gray-600">
                                        <option value="">Bangkok/Paris</option>
                                        <option value="bangkok">Bangkok</option>
                                        <option value="paris">Paris</option>
                                        <option value="london">London</option>
                                        <option value="newyork">New York</option>
                                    </select>
                                </div>
                                
                                <div className="mb-6">
                                    <input 
                                        type="text" 
                                        placeholder="Postal Code" 
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                                    />
                                </div>
                                
                                <button className="w-full md:w-auto px-8 py-3 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors font-medium">
                                    Continue Shipping
                                </button>
                            </div>
                        </div>

                        
                        <div className="lg:w-96 flex-shrink-0">
                            <div className="bg-gray-50 rounded-lg p-6">
                                
                                <div className="space-y-4 mb-6">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-200 last:border-b-0">
                                            <div className="w-16 h-16 flex-shrink-0 bg-white rounded-md overflow-hidden">
                                                <img 
                                                    src={item.image} 
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-sm font-semibold text-[#151875] mb-1">{item.name}</h4>
                                                <p className="text-xs text-gray-500">Color: {item.color}</p>
                                                <p className="text-xs text-gray-500">Size: {item.size}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-semibold text-[#151875]">${item.price.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                
                                <div className="pt-4 border-t border-gray-200 p-5 bg-[#d0d0d4]  ">
                                    <div className="flex justify-between items-center mb-3 border-b border-gray-400">
                                        <span className="text-sm font-semibold text-gray-600">Subtotals:</span>
                                        <span className="text-sm font-semibold text-[#151875]">$219.00</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-4 border-b border-gray-400">
                                        <span className="text-sm font-semibold text-gray-600">Totals:</span>
                                        <span className="text-lg font-semibold text-[#151875]">£219.00</span>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 mb-4">
                                        <input 
                                            type="checkbox" 
                                            id="shippingTax"
                                            className="w-4 h-4 text-pink-500 rounded border-gray-300 focus:ring-pink-500"
                                        />
                                        <label htmlFor="shippingTax" className="text-xs text-gray-500">
                                            Shipping & taxes calculated at checkout
                                        </label>
                                    </div>
                                    
                                    <button className="w-full py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors font-medium">
                                        Process To Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    );
};

export default HektoDemo;