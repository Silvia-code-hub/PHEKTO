import React from "react";
import Layout from "../Components/layout";
import { Link } from "react-router-dom";

const MyAcc: React.FC = () => {
    return (
        <div className="min-h-screen bg-white">
            <Layout>
                
                <div className="bg-[#f6f5ff]">
                    <div className="max-w-[1200px] mx-auto px-4 py-12 sm:py-16">
                        <h1 className="text-3xl sm:text-4xl font-bold text-[#151875] mb-3">
                            My Account
                        </h1>
                        <div className="flex items-center gap-2 text-sm">
                            <Link to="/" className="text-[#151875] hover:text-pink-500 transition">Home</Link>
                            <span className="text-gray-400">·</span>
                            <span className="text-[#151875]">Pages</span>
                            <span className="text-gray-400">·</span>
                            <span className="text-pink-500 font-medium">My Account</span>
                        </div>
                    </div>
                </div>

               
                <div className="max-w-[1200px] mx-auto px-4 py-12">
                    <div className="grid lg:flex-row gap-12">
                       
                        <div className="flex-1">
                            <div className="max-w-md mx-auto lg:mx-0">
                                <h2 className="text-2xl font-bold text-[#151875] mb-2">Login</h2>
                                <p className="text-gray-500 text-sm mb-6">
                                    Please login using account detail below.
                                </p>
                                
                                <form className="space-y-4">
                                    <div>
                                        <input 
                                            type="email" 
                                            placeholder="Email Address" 
                                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none  text-sm"
                                        />
                                    </div>
                                    <div>
                                        <input 
                                            type="password" 
                                            placeholder="Password" 
                                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none  text-sm"
                                        />
                                    </div>
                                    
                                    <div className="text-right">
                                        <Link to="/forgot-password" className="text-sm text-gray-500 hover:text-pink-500 transition">
                                            Forgot your password?
                                        </Link>
                                    </div>
                                    
                                    <button 
                                        type="submit"
                                        className="w-full py-3 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors font-medium text-sm"
                                    >
                                        Sign In
                                    </button>
                                    
                                    <p className="text-center text-sm text-gray-500 mt-4">
                                        Don't have an Account?{" "}
                                        <Link to="/create-account" className="text-gray-500 hover:underline">
                                            Create account
                                        </Link>
                                    </p>
                                </form>
                            </div>
                        </div>

                        
                  
                    <div className="mt-12">
                        <img 
                            src="https://res.cloudinary.com/dua4go47y/image/upload/v1777010168/products/image_015.png" 
                            alt="Advertisement"
                            className="w-full h-auto object-cover rounded-lg"
                        />
                    </div>
                </div>
                </div>
            </Layout>
        </div>
    );
};

export default MyAcc;