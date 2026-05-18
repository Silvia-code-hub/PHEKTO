import React, { useState } from "react";
import Layout from "../Components/layout";
import { Link } from "react-router-dom";

const Faq: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        subject: "",
        message: ""
    });

    const faqQuestions = [
        {
            question: "Eu dictumst cum at sed euismod condimentum?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt sed tristique mollis vitae, consequat gravida sagittis."
        },
        {
            question: "Magna bibendum est fermentum eros.",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt sed tristique mollis vitae, consequat gravida sagittis."
        },
        {
            question: "Odio muskanahak eris conseckin sceleton?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt sed tristique mollis vitae, consequat gravida sagittis."
        },
        {
            question: "Elit id blandit sabara boi velit qua mara?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt sed tristique mollis vitae, consequat gravida sagittis."
        }
    ];

    

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        
    };

    return (
        <div className="min-h-screen bg-white">
            <Layout>
                
                <div className="bg-[#f6f5ff]">
                    <div className="max-w-[1200px] mx-auto px-4 py-12 sm:py-16">
                        <h1 className="text-3xl sm:text-4xl font-bold text-[#151875] mb-3">
                            FAQ
                        </h1>
                        <div className="flex items-center gap-2 text-sm">
                            <Link to="/" className="text-[#151875] hover:text-pink-500 transition">Home .</Link>
                            <span className="text-[#151875]">Pages .</span>
                            <span className="text-pink-500 font-medium">Faq</span>
                        </div>
                    </div>
                </div>

                
                <div className="max-w-[1200px] mx-auto px-4 py-12">
                    <div className="flex flex-col lg:flex-row gap-12">
                       
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-[#151875] mb-6">General Information</h2>
                            
                            <div className="space-y-6">
                                {faqQuestions.map((faq, index) => (
                                    <div key={index} className="border-b border-gray-200 pb-5">
                                        <h3 className="text-base font-semibold text-[#151875] mb-2">
                                            {faq.question}
                                        </h3>
                                        <p className="text-sm text-gray-500 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                       
                        <div className="lg:w-96 flex-shrink-0">
                            <div className="bg-gray-50 rounded-lg p-6">
                                <h3 className="text-xl font-bold text-[#151875] mb-4">Ask a Question</h3>
                                
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Your Name <span className="text-pink-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Enter your name"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-sm"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Subject <span className="text-pink-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Enter subject"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-sm"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Type Your Message <span className="text-pink-500">*</span>
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                            rows={4}
                                            placeholder="Write your message here..."
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-sm resize-none"
                                        />
                                    </div>
                                    
                                    <button
                                        type="submit"
                                        className="w-full py-3 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors font-medium text-sm"
                                    >
                                        Send Mail
                                    </button>
                                </form>
                            </div>
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
            </Layout>
        </div>
    );
};

export default Faq;