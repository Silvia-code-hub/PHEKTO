


const HeroSection = () => {
  return(
    
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
        
        <button className='bg-custom-pink px-8 py-3.5 text-white hover:bg-pink-600 transition-colors duration-200 text-base font-semibold rounded'>
          Shop Now
        </button>
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

      <div className=' md:col-span-6 md:flex flex-col items-start text-left max-w-3xl px-4 py-12 w-full  '>
        <h3 className="font-bold text-lg text-custom-pink mb-4">Best Furniture For Your Castle....</h3>
        <h1 className="font-bold text-4xl lg:text-5xl xl:text-[53px] leading-tight md:leading-[1.2] tracking-[0.5%] mb-4 md:mb-6 w-full">New Furniture Collection Trends in 2020</h1>
        <h2 className="font-medium text-lg  text-custom-gray leading-relaxed mb-6  max-w-none w-full">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.</h2>
        <button className='bg-custom-pink px-6 py-3 md:px-8 md:py-4 text-white hover:bg-pink-600 transition-colors duration-200 text-sm sm:text-base md:text-lg font-semibold'> Shop Now
          
          </button>
      </div>
      {/* desktop-version right-img */}

      <div className='hidden md:flex md:col-span-3 justify-start items-center h-full '>
        <img src="/src/assets/images/sofa promotional header.png"
         alt=""
         className="h-auto max-h-[650px] w-auto object-contain scale-110" />
      </div>

      

    </div>
   )
}


export default HeroSection;

    