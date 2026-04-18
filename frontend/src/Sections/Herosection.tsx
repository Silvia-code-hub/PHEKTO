
import {Link} from 'react-router-dom'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import React from 'react';

const HeroSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    appendDots: (dots: any) => (
      <div className="absolute bottom-[10px] left-1/2 transform -translate-x-1/2 z-10">
        <ul className="flex space-x-1 justify-center align-center"> {/* Changed space-x-2 to space-x-1 */}
          {React.Children.map(dots, (dot, index) => {
            const isActive = dot.props.className.includes("slick-active");
            return React.cloneElement(dot, {
              key: index,
              children: React.cloneElement(dot.props.children, {
                style: {
                  ...dot.props.children.props.style,
                  // [ADJUSTMENT: Reduced button sizes]
                  width: isActive ? "20px" : "12px",  // Changed from 24px/16px to 20px/12px
                  height: isActive ? "20px" : "12px", // Changed from 24px/16px to 20px/12px
                  borderRadius: "4px",
                  background: isActive 
                    ? "#ec4899" 
                    : "transparent",
                  border: isActive 
                    ? "none" 
                    : "2px solid #ec4899",
                  transform: "rotate(45deg)",
                  display: "block",
                  transition: "all 0.3s ease",
                }
              })
            });
          })}
        </ul>
      </div>
    ),
    customPaging: () => (
      <div className="diamond-dot"></div>
    ),
  };
  
  return(
    <div className="w-full bg-gray-shade py-4">
      <Slider {...settings} className="w-full">
        
        {/* Slide 1 - All slide sizes remain unchanged */}
        <div>
          <div className="min-h-[400px] md:min-h-[450px] w-full">
            {/* Mobile Layout */}
            <div className="md:hidden w-full">
              {/*mobile top-img */}
              <div className="flex justify-center w-full pt-6 pb-3">
                <img 
                  src="/src/assets/images/image_32.png" 
                  className="h-40 sm:h-48 w-auto object-contain opacity-80"
                  alt="Furniture"
                />
              </div> 

              {/* mobile middle-content */}
              <div className='flex flex-col items-center text-center max-w-3xl px-4 py-3 w-full mx-auto'>
                <h3 className="font-bold text-base text-custom-pink mb-2">
                  Best Furniture For Your Castle....
                </h3>
                
                <h1 className="font-bold text-2xl sm:text-3xl leading-tight tracking-[0.5%] mb-3 w-full">
                  New Furniture Collection Trends in 2020
                </h1>
                
                <h2 className="font-medium text-sm text-custom-gray leading-relaxed mb-4 max-w-2xl w-full">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.
                </h2>
                <Link to={"/grid"}>
                  <button className='bg-custom-pink px-6 py-2.5 text-white hover:bg-pink-600 transition-colors duration-200 text-sm font-semibold rounded'>
                    Shop Now
                  </button>
                </Link>
              </div>

              {/*mobile  bottom-img */}
              <div className="flex justify-center w-full pt-4 pb-6">
                <img 
                  src="/src/assets/images/sofa promotional header.png" 
                  alt="Sofa promotional" 
                  className="h-40 sm:h-48 w-auto object-contain opacity-70"
                />
              </div>
            </div>

            
            <div className="hidden md:flex md:grid md:grid-cols-12 items-center min-h-[450px] w-full max-w-7xl mx-auto px-4">
              
              <div className="md:col-span-3 flex justify-end items-center h-full">
                <img 
                  src="/src/assets/images/image_32.png" 
                  className="h-auto max-h-[500px] object-contain w-auto scale-105 opacity-80"
                  alt="Furniture"
                />
              </div>

              
              <div className='md:col-span-6 flex flex-col items-start text-left px-4 py-8 w-full'>
                <h3 className="font-bold text-lg text-custom-pink mb-3">Best Furniture For Your Castle....</h3>
                <h1 className="font-bold text-3xl lg:text-4xl xl:text-[45px] leading-tight md:leading-[1.2] tracking-[0.5%] mb-3 md:mb-4 w-full">
                  New Furniture Collection Trends in 2020
                </h1>
                <h2 className="font-medium text-base text-custom-gray leading-relaxed mb-4 max-w-none w-full">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.
                </h2>
                <Link to={"/grid"}>
                  <button className='bg-custom-pink px-5 py-2 md:px-6 md:py-3 text-white hover:bg-pink-600 transition-colors duration-200 text-sm md:text-base font-semibold'>
                    Shop Now
                  </button>
                </Link>
              </div>
              
              
              <div className='md:col-span-3 flex justify-start items-center h-full'>
                <img 
                  src="/src/assets/images/sofa promotional header.png"
                  alt="Sofa promotional"
                  className="h-auto max-h-[500px] w-auto object-contain scale-105" 
                />
              </div>
            </div>
          </div>
        </div>

       
        <div>
          <div className="min-h-[400px] md:min-h-[450px] w-full">
          
            <div className="md:hidden w-full">
              <div className="flex justify-center w-full pt-6 pb-3">
                <img 
                  src="/src/assets/images/image_32.png" 
                  className="h-40 sm:h-48 w-auto object-contain opacity-80"
                  alt="Furniture"
                />
              </div> 

              <div className='flex flex-col items-center text-center max-w-3xl px-4 py-3 w-full mx-auto'>
                <h3 className="font-bold text-base text-custom-pink mb-2">
                  Premium Quality Collection
                </h3>
                
                <h1 className="font-bold text-2xl sm:text-3xl leading-tight tracking-[0.5%] mb-3 w-full">
                  Modern Designs for Modern Homes
                </h1>
                
                <h2 className="font-medium text-sm text-custom-gray leading-relaxed mb-4 max-w-2xl w-full">
                  Experience comfort and style with our premium furniture collection.
                </h2>
                <Link to={"/grid"}>
                  <button className='bg-custom-pink px-6 py-2.5 text-white hover:bg-pink-600 transition-colors duration-200 text-sm font-semibold rounded'>
                    Explore Collection
                  </button>
                </Link>
              </div>

              <div className="flex justify-center w-full pt-4 pb-6">
                <img 
                  src="/src/assets/images/sofa promotional header.png" 
                  alt="Sofa promotional" 
                  className="h-40 sm:h-48 w-auto object-contain opacity-70"
                />
              </div>
            </div>

            
            <div className="hidden md:flex md:grid md:grid-cols-12 items-center min-h-[450px] w-full max-w-7xl mx-auto px-4">
              <div className="md:col-span-3 flex justify-end items-center h-full">
                <img 
                  src="/src/assets/images/image_32.png" 
                  className="h-auto max-h-[500px] object-contain w-auto scale-105 opacity-80"
                  alt="Furniture"
                />
              </div>

              <div className='md:col-span-6 flex flex-col items-start text-left px-4 py-8 w-full'>
                <h3 className="font-bold text-lg text-custom-pink mb-3">Premium Quality Collection</h3>
                <h1 className="font-bold text-3xl lg:text-4xl xl:text-[45px] leading-tight md:leading-[1.2] tracking-[0.5%] mb-3 md:mb-4 w-full">
                  Modern Designs for Modern Homes
                </h1>
                <h2 className="font-medium text-base text-custom-gray leading-relaxed mb-4 max-w-none w-full">
                  Experience comfort and style with our premium furniture collection.
                </h2>
                <Link to={"/grid"}>
                  <button className='bg-custom-pink px-5 py-2 md:px-6 md:py-3 text-white hover:bg-pink-600 transition-colors duration-200 text-sm md:text-base font-semibold'>
                    Explore Collection
                  </button>
                </Link>
              </div>
              
              <div className='md:col-span-3 flex justify-start items-center h-full'>
                <img 
                  src="/src/assets/images/sofa promotional header.png"
                  alt="Sofa promotional"
                  className="h-auto max-h-[500px] w-auto object-contain scale-105" 
                />
              </div>
            </div>
          </div>
        </div>

       
        <div>
          <div className="min-h-[400px] md:min-h-[450px] w-full">
            
            <div className="md:hidden w-full">
              <div className="flex justify-center w-full pt-6 pb-3">
                <img 
                  src="/src/assets/images/image_32.png" 
                  className="h-40 sm:h-48 w-auto object-contain opacity-80"
                  alt="Furniture"
                />
              </div> 

              <div className='flex flex-col items-center text-center max-w-3xl px-4 py-3 w-full mx-auto'>
                <h3 className="font-bold text-base text-custom-pink mb-2">
                  Limited Time Offer
                </h3>
                
                <h1 className="font-bold text-2xl sm:text-3xl leading-tight tracking-[0.5%] mb-3 w-full">
                  Up to 40% Off on All Items
                </h1>
                
                <h2 className="font-medium text-sm text-custom-gray leading-relaxed mb-4 max-w-2xl w-full">
                  Don't miss out on our biggest sale of the year. Shop now!
                </h2>
                <Link to={"/grid"}>
                  <button className='bg-custom-pink px-6 py-2.5 text-white hover:bg-pink-600 transition-colors duration-200 text-sm font-semibold rounded'>
                    Shop Sale
                  </button>
                </Link>
              </div>

              <div className="flex justify-center w-full pt-4 pb-6">
                <img 
                  src="/src/assets/images/sofa promotional header.png" 
                  alt="Sofa promotional" 
                  className="h-40 sm:h-48 w-auto object-contain opacity-70"
                />
              </div>
            </div>

            
            <div className="hidden md:flex md:grid md:grid-cols-12 items-center min-h-[450px] w-full max-w-7xl mx-auto px-4">
              <div className="md:col-span-3 flex justify-end items-center h-full">
                <img 
                  src="/src/assets/images/image_32.png" 
                  className="h-auto max-h-[500px] object-contain w-auto scale-105 opacity-80"
                  alt="Furniture"
                />
              </div>

              <div className='md:col-span-6 flex flex-col items-start text-left px-4 py-8 w-full'>
                <h3 className="font-bold text-lg text-custom-pink mb-3">Limited Time Offer</h3>
                <h1 className="font-bold text-3xl lg:text-4xl xl:text-[45px] leading-tight md:leading-[1.2] tracking-[0.5%] mb-3 md:mb-4 w-full">
                  Up to 40% Off on All Items
                </h1>
                <h2 className="font-medium text-base text-custom-gray leading-relaxed mb-4 max-w-none w-full">
                  Don't miss out on our biggest sale of the year. Shop now!
                </h2>
                <Link to={"/grid"}>
                  <button className='bg-custom-pink px-5 py-2 md:px-6 md:py-3 text-white hover:bg-pink-600 transition-colors duration-200 text-sm md:text-base font-semibold'>
                    Shop Sale
                  </button>
                </Link>
              </div>
              
              <div className='md:col-span-3 flex justify-start items-center h-full'>
                <img 
                  src="/src/assets/images/sofa promotional header.png"
                  alt="Sofa promotional"
                  className="h-auto max-h-[500px] w-auto object-contain scale-105" 
                />
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  )
}

export default HeroSection;




    