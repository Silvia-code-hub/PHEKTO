import Layout from "../Components/layout"
import { Link } from "react-router-dom"

const ContactUs: React.FC = () => {
    return (
        <div className="bg-white">
            <Layout>
               
                <div className="bg-[#F6F5FF] py-16 md:py-20 px-4">
                    <div className="max-w-7xl mx-auto text-start">
                        <h2 className="text-3xl md:text-4xl font-bold text-blue-shade mb-4">
                            Contact Us
                        </h2>
                        <div className="flex  items-center gap-2 text-sm md:text-base text-start">
                            <button className="text-black hover:text-pink-500 transition-colors"><Link to="/">Home .</Link></button>
                            <button className="text-black hover:text-pink-500 transition-colors">Pages .</button>
                            <button className="text-pink-500 font-semibold">Contact Us</button>
                        </div>
                    </div>
                </div>

               
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-12 lg:mb-16">
                       
                        <div className="flex-1">
                            <h3 className="text-2xl md:text-3xl font-bold text-blue-shade mb-4 md:mb-6">
                                Information About us
                            </h3>
                            <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-6">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis neque ultrices 
                                mattis aliquam, malesuada diam est. Malesuada sem tristique amet erat vitae 
                                eget dolor lobortis. Accumsan faucibus vitae lobortis quis bibendum quam.
                            </p>
                            
                           
                            <div className="flex gap-3 mb-8 md:mb-10">
                                <div className="w-8 h-8 rounded-full bg-blue-shade cursor-pointer hover:scale-110 transition-transform"></div>
                                <div className="w-8 h-8 rounded-full bg-custom-pink cursor-pointer hover:scale-110 transition-transform"></div>
                                <div className="w-8 h-8 rounded-full bg-green-800 cursor-pointer hover:scale-110 transition-transform"></div>
                            </div>

                           
                        </div>

                      
                        <div className="flex-1">
                            <h3 className="text-2xl md:text-3xl font-bold text-blue-shade mb-6 md:mb-8">
                                Contact Way
                            </h3>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                                
                                <div className="flex items-start gap-4 hover:shadow-lg transition-all duration-300 p-4 rounded-lg bg-white">
                                    <div className="w-12 h-12 bg-blue-shade rounded-full"></div>
                                    <div>
                                        <p className="font-semibold text-gray-800">Tel: 877-67-88-99</p>
                                        <p className="text-gray-500 text-sm">E-Mail: shop@store.com</p>
                                    </div>
                                </div>

                                
                                <div className="flex items-start gap-4 hover:shadow-lg transition-all duration-300 p-4 rounded-lg bg-white">
                                    <div className="w-12 h-12 bg-custom-pink rounded-full"></div>
                                    <div>
                                        <p className="font-semibold text-gray-800">20 Margaret st, London</p>
                                        <p className="text-gray-500 text-sm">Great britain, 3NM98-LK</p>
                                    </div>
                                </div>

                                
                                <div className="flex items-start gap-4 hover:shadow-lg transition-all duration-300 p-4 rounded-lg bg-white">
                                    <div className="w-12 h-12 bg-[#FFB347] rounded-full"></div>
                                    <div>
                                        <p className="font-semibold text-gray-800">Support Forum</p>
                                        <p className="text-gray-500 text-sm">For over 24hr</p>
                                    </div>
                                </div>

                               
                                <div className="flex items-start gap-4 hover:shadow-lg transition-all duration-300 p-4 rounded-lg bg-white">
                                    <div className="w-12 h-12 bg-[#5C9E5E] rounded-full"></div>
                                    <div>
                                        <p className="font-semibold text-gray-800">Free standard shipping</p>
                                        <p className="text-gray-500 text-sm">on all orders.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                  
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mt-8">
                       
                        <div className="flex-1">
                            <h3 className="text-2xl md:text-3xl font-bold text-[#151875] mb-4 md:mb-6">
                                Get In Touch
                            </h3>
                            <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-6 md:mb-8">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis neque ultrices 
                                tristique amet erat vitae eget dolor los vitae lobortis quis bibendum quam.
                            </p>
                            
                            <form className="space-y-4 md:space-y-6">
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2"></label>
                                        <input 
                                            type="text" 
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                                            placeholder="Your Name*"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2"></label>
                                        <input 
                                            type="email" 
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                                            placeholder="Your E-mail"
                                        />
                                    </div>
                                </div>
                                
                               
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2"></label>
                                    <input 
                                        type="text" 
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                                        placeholder="Subject*"
                                    />
                                </div>
                                
                                
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2"></label>
                                    <textarea 
                                        rows={5}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-vertical"
                                        placeholder="Type Your Message*"
                                    ></textarea>
                                </div>
                                
                               
                                <div>
                                    <button 
                                        type="submit"
                                        className="bg-pink-700 text-white px-8 py-3 rounded-md hover:bg-pink-600 transition-colors font-semibold shadow-md hover:shadow-lg"
                                    >
                                        Send Mail
                                    </button>
                                </div>
                            </form>
                        </div>

                        
                        <div className="flex-1 flex items-center justify-center">
                            <div className="w-full max-w-md">
                                {/* Option 1: Using an img tag with your image URL */}
                                <img 
                                    // src="/path/to/your/contact-image.jpg"  // Replace with your actual image path
                                    // alt="Contact Us"
                                    // className="w-full h-auto rounded-lg shadow-lg object-cover"
                                />
                                
                                {/* Option 2: If you don't have an image yet, use this SVG placeholder */}
                                 <div className="w-full bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg h-96 flex items-center justify-center shadow-lg">
                                    <svg className="w-40 h-40 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                                        />
                                    </svg>
                                    <p className="text-gray-500 mt-4">Contact Image</p>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default ContactUs