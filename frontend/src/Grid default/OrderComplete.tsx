import React from 'react';
import Layout from "../Components/layout";
import { Link } from 'react-router-dom';
import { FaRegClock, FaClipboardList, FaCheckCircle } from 'react-icons/fa';

const OrderComplete: React.FC = () => {
    return (
        <div className="bg-white min-h-screen">
            <Layout>
                
                <div className="bg-[#f6f5ff] w-full py-12 sm:py-16 md:py-20 mb-8 sm:mb-12">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-deep-blue mb-3 sm:mb-4">
                            Order Completed
                        </h1>
                        <div className="flex items-center gap-1 text-sm flex-wrap">
                            <Link to="/" className="text-deep-blue hover:text-pink-500 font-semibold transition">
                                Home .
                            </Link>
                            <span className="text-deep-blue font-semibold">Pages .</span>
                            <span className="text-pink-500 font-semibold">Order Completed</span>
                        </div>
                    </div>
                </div>

                
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                    <div className="max-w-4xl mx-auto">
                        <div 
                            className="bg-white rounded-2xl shadow-sm relative"
                            style={{
                                borderLeft: '2px dotted #cbd5e1',
                                borderBottom: '2px dotted #cbd5e1',
                                borderTop: '1px solid #f0f0f0',
                                borderRight: '1px solid #f0f0f0'
                            }}
                        >
                            
                            <div className="absolute left-0 top-1/3 -translate-y-1/2 -translate-x-1/2 z-20">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-50 rounded-full flex items-center justify-center">
                                    <FaRegClock className="text-blue-500 text-2xl sm:text-3xl" />
                                </div>
                            </div>

                           
                            <div className="absolute -bottom-6 -right-6 z-20">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-pink-50 rounded-full flex items-center justify-center">
                                    <FaClipboardList className="text-pink-500 text-2xl sm:text-3xl" />
                                </div>
                            </div>

                           
                            <div className="relative z-10 pt-16 pb-6 text-center">
                                <div className="flex justify-center items-center">
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-pink-50 rounded-full flex items-center justify-center shadow-md">
                                        <FaCheckCircle className="text-pink-500 text-4xl sm:text-5xl" />
                                    </div>
                                </div>
                            </div>

                            
                            <div className="text-center px-6 pb-6 relative z-10">
                                <h2 className="text-2xl sm:text-3xl font-bold text-[#101750] mb-4">
                                    Your Order Is Completed!
                                </h2>
                                <p className="text-gray-500 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
                                    Thank you for your order! Your order is being processed and will be completed within 3-6 hours. 
                                    You will receive an email confirmation when your order is completed.
                                </p>
                            </div>

                            
                            <div className="text-center pb-16 relative z-10">
                                <Link to="/shop-list">
                                    <button className="px-8 py-3 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-all font-medium shadow-sm hover:shadow-md">
                                        Continue Shopping
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    );
};

export default OrderComplete;