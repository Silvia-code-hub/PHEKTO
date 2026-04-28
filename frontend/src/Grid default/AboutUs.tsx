import React, { useState } from 'react';
import Layout from "../Components/layout";
import { Link } from 'react-router-dom';
import ShopexItem from "../Sections/ShopexCard";
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const AboutUs: React.FC = () => {
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    
    const getOptimizedImageUrl = (
        imageUrl: string, 
        width: number = 400, 
        height: number = 300,
        borderRadius: number = 0
    ): string => {
        if (!imageUrl) return '';
        const urlParts = imageUrl.split('/upload/');
        if (urlParts.length < 2) return imageUrl;
        const transformations = `w_${width},h_${height},c_fill,q_auto,f_auto,r_${borderRadius}`;
        return `${urlParts[0]}/upload/${transformations}/${urlParts[1]}`;
    };

    const testimonials = [
        {
            id: 1,
            name: 'Selina Gomez',
            role: 'CEO & Founder',
            rating: 4.5,
            mainImage: 'https://res.cloudinary.com/dua4go47y/image/upload/v1777010228/products/image_067.jpg',
            sideImages: [
                'https://res.cloudinary.com/dua4go47y/image/upload/v1777010230/products/image_068.jpg',
                'https://res.cloudinary.com/dua4go47y/image/upload/v1777010226/products/image_064.jpg'
            ],
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget nibh id metus sodales congue. Fusce dapibus, risus sed dignissim feugiat, odio nisi ultricies massa, nec pulvinar neque leo et sapien.'
        }
    ];

    const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={i} className="text-yellow-400 text-sm" />);
        }
        if (hasHalfStar) {
            stars.push(<FaStarHalfAlt key="half" className="text-yellow-400 text-sm" />);
        }
        const emptyStars = 5 - stars.length;
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FaStar key={`empty-${i}`} className="text-gray-300 text-sm" />);
        }
        return <div className="flex items-center gap-0.5 justify-center">{stars}</div>;
    };

    return (
        <div className="bg-white min-h-screen">
            <Layout>
                <div className="bg-[#f6f5ff] w-full py-12 sm:py-16 md:py-20 mb-8 sm:mb-12">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-deep-blue mb-3 sm:mb-4">
                            About Us
                        </h1>
                        <div className="flex items-center gap-2 text-sm flex-wrap">
                            <Link to="/" className="text-deep-blue hover:text-pink-500 font-semibold transition">
                                Home .
                            </Link>
                            <span className="text-deep-blue font-semibold">Pages .</span>
                            <span className="text-pink-500 font-semibold">About Us</span>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                    
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-16 lg:mb-20 items-center">
                        <div className="w-full lg:w-2/5">
                            <div className="relative rounded-lg overflow-hidden shadow-lg group max-w-md mx-auto lg:mx-0">
                                <img 
                                    src={getOptimizedImageUrl('https://res.cloudinary.com/dua4go47y/image/upload/v1777010227/products/image_066.jpg', 400, 300, 6)}
                                    alt="About Us - Ecommerce Business"
                                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                                    style={{ borderRadius: '6px' }}
                                />
                            </div>
                        </div>
                        
                        <div className="w-full lg:w-3/5 flex flex-col justify-center">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#101750] mb-4 sm:mb-6 leading-tight">
                                Know About Our Ecommerce <br />
                                Business, History
                            </h2>
                            <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis neque ultrices mattis aliquam, 
                                malesuada diam est. Malesuada sem tristique amet erat vitae eget dolor lobortis. 
                                Accumsan faucibus vitae lobortis quis bibendum quam.
                            </p>
                            <Link to="/contact-us">
                                <button className="px-6 sm:px-8 py-2.5 sm:py-3 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-all font-medium shadow-sm hover:shadow-md w-full sm:w-auto">
                                    Contact Us
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="mb-16 lg:mb-20">
                        <div className="text-center mb-8 sm:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#101750] mb-3">
                                Our Features
                            </h2>
                            <div className="w-20 h-1 bg-pink-500 mx-auto rounded-full"></div>
                        </div>
                        <ShopexItem/>
                    </div>

                    <div>
                        <div className="text-center mb-8 sm:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#101750] mb-3">
                                Our Client Say!
                            </h2>
                            <div className="w-20 h-1 bg-pink-500 mx-auto rounded-full"></div>
                        </div>

                        <div className="max-w-4xl mx-auto">
                            {testimonials.map((testimonial) => (
                                <div key={testimonial.id} className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
                                    
                                    <div className="flex justify-center items-end gap-4 mb-8">
                                        <div className="hidden sm:block">
                                            <img 
                                                src={getOptimizedImageUrl(testimonial.sideImages[0], 80, 80, 8)}
                                                alt="Client"
                                                className="w-16 h-16 object-cover border border-gray-200"
                                                style={{ borderRadius: '8px' }}
                                            />
                                        </div>
                                        
                                        <div className="relative transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 z-10">
                                            <img 
                                                src={getOptimizedImageUrl(testimonial.mainImage, 120, 120, 12)}
                                                alt={testimonial.name}
                                                className="w-24 h-24 sm:w-28 sm:h-28 object-cover shadow-xl"
                                                style={{ borderRadius: '12px' }}
                                            />
                                        </div>
                                        
                                        <div className="hidden sm:block">
                                            <img 
                                                src={getOptimizedImageUrl(testimonial.sideImages[1], 80, 80, 8)}
                                                alt="Client"
                                                className="w-16 h-16 object-cover border border-gray-200"
                                                style={{ borderRadius: '8px' }}
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-center gap-3 mb-6 sm:hidden">
                                        <img 
                                            src={getOptimizedImageUrl(testimonial.sideImages[0], 60, 60, 8)}
                                            alt="Client"
                                            className="w-12 h-12 object-cover border border-gray-200"
                                            style={{ borderRadius: '8px' }}
                                        />
                                        <img 
                                            src={getOptimizedImageUrl(testimonial.sideImages[1], 60, 60, 8)}
                                            alt="Client"
                                            className="w-12 h-12 object-cover border border-gray-200"
                                            style={{ borderRadius: '8px' }}
                                        />
                                    </div>
                                    
                                    <div className="text-center mb-4">
                                        <h3 className="text-xl sm:text-2xl font-bold text-[#101750] mb-1">
                                            {testimonial.name}
                                        </h3>
                                        <p className="text-pink-500 text-sm mb-2">{testimonial.role}</p>
                                        <StarRating rating={testimonial.rating} />
                                    </div>
                                    
                                    <p className="text-gray-500 text-sm sm:text-base leading-relaxed text-center italic max-w-2xl mx-auto">
                                        "{testimonial.description}"
                                    </p>

                                    <div className="flex justify-center gap-2 mt-8">
                                        <button 
                                            onClick={() => setActiveTestimonial(0)}
                                            className={`transition-all duration-300 rounded-full ${
                                                activeTestimonial === 0 
                                                    ? 'w-8 h-2 bg-pink-500' 
                                                    : 'w-2 h-2 bg-gray-300 hover:bg-pink-300'
                                            }`}
                                        />
                                        <button 
                                            onClick={() => setActiveTestimonial(1)}
                                            className={`transition-all duration-300 rounded-full ${
                                                activeTestimonial === 1 
                                                    ? 'w-8 h-2 bg-pink-500' 
                                                    : 'w-2 h-2 bg-gray-300 hover:bg-pink-300'
                                            }`}
                                        />
                                        <button 
                                            onClick={() => setActiveTestimonial(2)}
                                            className={`transition-all duration-300 rounded-full ${
                                                activeTestimonial === 2 
                                                    ? 'w-8 h-2 bg-pink-500' 
                                                    : 'w-2 h-2 bg-gray-300 hover:bg-pink-300'
                                            }`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    );
};

export default AboutUs;