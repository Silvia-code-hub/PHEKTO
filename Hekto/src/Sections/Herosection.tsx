
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
        <ul className="flex space-x-1 justify-center align-center">
          {React.Children.map(dots, (dot, index) => {
            const isActive = dot.props.className.includes("slick-active");
            return React.cloneElement(dot, {
              key: index,
              children: React.cloneElement(dot.props.children, {
                style: {
                  ...dot.props.children.props.style,
                  width: isActive ? "20px" : "12px",
                  height: isActive ? "20px" : "12px",
                  borderRadius: "2px",
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
    <div className="w-full r bg-gray-shade ">
      {/* Carousel Slider */}
      <Slider {...settings} className="w-full ">
        {/* Slide 1 */}
        <div>
    <div className="flex flex-col md:grid md:grid-cols-12 items-center bg-gray-shade min-h-[500px] md:min-h-[600px] gap-0 md:gap-0 px-0 overflow-hidden w-full">
       
       {/*mobile top-img */}
        <div className="md:hidden flex justify-center w-full pt-8 pb-4">
          <img 
        src="/src/assets/images/image_32.png" 
         className="h-48 sm:h-56 w-auto object-contain opacity-80"
         />
        </div> 

        {/* mobile middle-content */}
         <div className='md:hidden flex flex-col items-center text-center max-w-3xl px-4 py-4 w-full'>
        <h3 className="font-bold text-base text-custom-pink mb-3">
          Best Furniture For Your Castle....
        </h3>
        
        <h1 className="font-bold text-3xl sm:text-4xl leading-tight tracking-[0.5%] mb-4 w-full">
          New Furniture Collection Trends in 2020
        </h1>
        
        <h2 className="font-medium text-sm sm:text-base text-custom-gray leading-relaxed mb-6 max-w-2xl w-full">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.
        </h2>
        <Link to={"/grid"}>
        <button className='bg-custom-pink px-8 py-3.5 text-white hover:bg-pink-600 transition-colors duration-200 text-base font-semibold rounded'>
          Shop Now
        </button>
        </Link>
      </div>

       {/*mobile  bottom-img */}
         <div className="md:hidden flex justify-center w-full pt-6 pb-8">
          <img 
          src="/src/assets/images/sofa promotional header.png" 
          alt="Sofa promotional" 
          className="h-48 sm:h-56 w-auto object-contain opacity-70"
        />
         </div>

      {/* desktop version left-img */}
      <div className=" hidden md:flex md:col-span-3  justify-end items-center h-full">
        <img 
        src="/src/assets/images/image_32.png" 
        className=" h-auto max-h-[650px] object-contain w-auto scale-110 opacity-80" />
      </div>

      {/* desktop-version middle-content */}

      <div className='hidden md:col-span-6 md:flex flex-col items-start text-left max-w-3xl px-4 py-12 w-full  '>
        <h3 className="font-bold text-lg text-custom-pink mb-4">Best Furniture For Your Castle....</h3>
        <h1 className="font-bold text-4xl lg:text-5xl xl:text-[53px] leading-tight md:leading-[1.2] tracking-[0.5%] mb-4 md:mb-6 w-full">New Furniture Collection Trends in 2020</h1>
        <h2 className="font-medium text-lg  text-custom-gray leading-relaxed mb-6  max-w-none w-full">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.</h2>
        <Link to={"/grid"}>
        <button className='bg-custom-pink px-6 py-3 md:px-8 md:py-4 text-white hover:bg-pink-600 transition-colors duration-200 text-sm sm:text-base md:text-lg font-semibold'> Shop Now
          
          </button>
          </Link>
      </div>
      {/* desktop-version right-img */}

      <div className='hidden md:flex md:col-span-3 justify-start items-center h-full '>
        <img src="/src/assets/images/sofa promotional header.png"
         alt=""
         className="h-auto max-h-[650px] w-auto object-contain scale-110" />
      </div>

      

    </div>
        </div>
        {/* Slide 2 */}
        <div> 
          <div className="flex flex-col md:grid md:grid-cols-12 items-center bg-gray-shade min-h-[500px] md:min-h-[600px] gap-0 md:gap-0 px-0 overflow-hidden w-full">
       
       {/*mobile top-img */}
        <div className="md:hidden flex justify-center w-full pt-8 pb-4">
          <img 
        src="/src/assets/images/image_32.png" 
         className="h-48 sm:h-56 w-auto object-contain opacity-80"
         />
        </div> 

        {/* mobile middle-content */}
         <div className='md:hidden flex flex-col items-center text-center max-w-3xl px-4 py-4 w-full'>
        <h3 className="font-bold text-base text-custom-pink mb-3">
          Limited Time Offer
        </h3>
        
        <h1 className="font-bold text-3xl sm:text-4xl leading-tight tracking-[0.5%] mb-4 w-full">
          Up to 40% Off on All Items
        </h1>
        
        <h2 className="font-medium text-sm sm:text-base text-custom-gray leading-relaxed mb-6 max-w-2xl w-full">
           Don't miss out on our biggest sale of the year. Shop now!
        </h2>
        <Link to={"/grid"}>
        <button className='bg-custom-pink px-8 py-3.5 text-white hover:bg-pink-600 transition-colors duration-200 text-base font-semibold rounded'>
           Shop Sale
        </button>
        </Link>
      </div>

       {/*mobile  bottom-img */}
         <div className="md:hidden flex justify-center w-full pt-6 pb-8">
          <img 
          src="/src/assets/images/sofa promotional header.png" 
          alt="Sofa promotional" 
          className="h-48 sm:h-56 w-auto object-contain opacity-70"
        />
         </div>

      {/* desktop version left-img */}
      <div className=" hidden md:flex md:col-span-3  justify-end items-center h-full">
        <img 
        src="/src/assets/images/image_32.png" 
        className=" h-auto max-h-[650px] object-contain w-auto scale-110 opacity-80" />
      </div>

      {/* desktop-version middle-content */}

      <div className='hidden md:col-span-6 md:flex flex-col items-start text-left max-w-3xl px-4 py-12 w-full  '>
        <h3 className="font-bold text-lg text-custom-pink mb-4">Limited Time Offer</h3>
        <h1 className="font-bold text-4xl lg:text-5xl xl:text-[53px] leading-tight md:leading-[1.2] tracking-[0.5%] mb-4 md:mb-6 w-full"> Up to 40% Off on All Items</h1>
        <h2 className="font-medium text-lg  text-custom-gray leading-relaxed mb-6  max-w-none w-full"> Don't miss out on our biggest sale of the year. Shop now!</h2>
        <Link to={"/grid"}>
        <button className='bg-custom-pink px-6 py-3 md:px-8 md:py-4 text-white hover:bg-pink-600 transition-colors duration-200 text-sm sm:text-base md:text-lg font-semibold'> Shop Sale
          
          </button>
          </Link>
      </div>
      {/* desktop-version right-img */}

      <div className='hidden md:flex md:col-span-3 justify-start items-center h-full '>
        <img src="/src/assets/images/sofa promotional header.png"
         alt=""
         className="h-auto max-h-[650px] w-auto object-contain scale-110" />
      </div>

      

    </div>
        </div>
        {/* slide 3 */}
        <div>
          <div> 
          <div className="flex flex-col md:grid md:grid-cols-12 items-center bg-gray-shade min-h-[500px] md:min-h-[600px] gap-0 md:gap-0 px-0 overflow-hidden w-full">
       
       {/*mobile top-img */}
        <div className="md:hidden flex justify-center w-full pt-8 pb-4">
          <img 
        src="/src/assets/images/image_32.png" 
         className="h-48 sm:h-56 w-auto object-contain opacity-80"
         />
        </div> 

        {/* mobile middle-content */}
         <div className='md:hidden flex flex-col items-center text-center max-w-3xl px-4 py-4 w-full'>
        <h3 className="font-bold text-base text-custom-pink mb-3">
          Best Furniture For Your Castle....
        </h3>
        
        <h1 className="font-bold text-3xl sm:text-4xl leading-tight tracking-[0.5%] mb-4 w-full">
          New Furniture Collection Trends in 2020
        </h1>
        
        <h2 className="font-medium text-sm sm:text-base text-custom-gray leading-relaxed mb-6 max-w-2xl w-full">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.
        </h2>
        <Link to={"/grid"}>
        <button className='bg-custom-pink px-8 py-3.5 text-white hover:bg-pink-600 transition-colors duration-200 text-base font-semibold rounded'>
          Shop Now
        </button>
        </Link>
      </div>

       {/*mobile  bottom-img */}
         <div className="md:hidden flex justify-center w-full pt-6 pb-8">
          <img 
          src="/src/assets/images/sofa promotional header.png" 
          alt="Sofa promotional" 
          className="h-48 sm:h-56 w-auto object-contain opacity-70"
        />
         </div>

      {/* desktop version left-img */}
      <div className=" hidden md:flex md:col-span-3  justify-end items-center h-full">
        <img 
        src="/src/assets/images/image_32.png" 
        className=" h-auto max-h-[650px] object-contain w-auto scale-110 opacity-80" />
      </div>

      {/* desktop-version middle-content */}

      <div className='hidden md:col-span-6 md:flex flex-col items-start text-left max-w-3xl px-4 py-12 w-full  '>
        <h3 className="font-bold text-lg text-custom-pink mb-4">Best Furniture For Your Castle....</h3>
        <h1 className="font-bold text-4xl lg:text-5xl xl:text-[53px] leading-tight md:leading-[1.2] tracking-[0.5%] mb-4 md:mb-6 w-full">New Furniture Collection Trends in 2020</h1>
        <h2 className="font-medium text-lg  text-custom-gray leading-relaxed mb-6  max-w-none w-full">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.</h2>
        <Link to={"/grid"}>
        <button className='bg-custom-pink px-6 py-3 md:px-8 md:py-4 text-white hover:bg-pink-600 transition-colors duration-200 text-sm sm:text-base md:text-lg font-semibold'> Shop Now
          
          </button>
          </Link>
      </div>
      {/* desktop-version right-img */}

      <div className='hidden md:flex md:col-span-3 justify-start items-center h-full '>
        <img src="/src/assets/images/sofa promotional header.png"
         alt=""
         className="h-auto max-h-[650px] w-auto object-contain scale-110" />
      </div>

      

    </div>
        </div>
        </div>
      </Slider>
    </div>

   )
}


export default HeroSection;

    