import React from "react";
import Layout from "../Components/layout";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
    return (
        <div className="min-h-screen bg-white">
            <Layout>
                
                <div className="bg-[#f6f5ff]">
                    <div className="max-w-[1200px] mx-auto px-4 py-12 sm:py-16">
                        <h1 className="text-3xl sm:text-4xl font-bold text-[#151875] mb-3">
                            404 Not Found
                        </h1>
                        <div className="flex items-center gap-2 text-sm">
                            <Link to="/" className="text-[#151875] hover:text-pink-500 transition">Home</Link>
                            <span className="text-gray-400">·</span>
                            <span className="text-[#151875]">Pages</span>
                            <span className="text-gray-400">·</span>
                            <span className="text-pink-500 font-medium">404 Not Found</span>
                        </div>
                    </div>
                </div>

                
                <div className="max-w-[1200px] mx-auto px-4 py-12">
                    <div className="flex flex-col items-center justify-center text-center">
                       
                        <div className="mb-8">
                            
                            <img 
                                src="https://res.cloudinary.com/dua4go47y/image/upload/v1777010168/products/404-illustration.svg" 
                                alt="404 Illustration"
                                className="w-64 h-64 md:w-80 md:h-80 object-contain"
                                onError={(e) => {
                                    
                                    e.currentTarget.style.display = 'none';
                                    const parent = e.currentTarget.parentElement;
                                    if (parent) {
                                        const fallback = document.createElement('div');
                                        fallback.className = 'w-64 h-64 md:w-80 md:h-80 flex items-center justify-center';
                                        fallback.innerHTML = `
                                            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
                                                <circle cx="100" cy="100" r="90" fill="#f6f5ff" stroke="#151875" stroke-width="2"/>
                                                <text x="100" y="110" text-anchor="middle" font-size="64" font-weight="bold" fill="#151875" font-family="Arial">404</text>
                                                <text x="100" y="140" text-anchor="middle" font-size="16" fill="#pink-500" font-family="Arial">Not Found</text>
                                            </svg>
                                        `;
                                        parent.appendChild(fallback);
                                    }
                                }}
                            />
                        </div>

                        
                        <div className="mb-8">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#151875] mb-4">
                                Oops! The page you requested was not found!
                            </h2>
                            
                            <Link to="/">
                                <button className="px-8 py-3 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors font-medium text-sm">
                                    Back To Home
                                </button>
                            </Link>
                        </div>

                        

                        
                        <div className="mt-12 w-full">
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

export default NotFound;