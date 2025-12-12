
const Banner =() =>{
    return(
        <div className=" h-[300px]  sm:h-[400px] md:h-[500px] overflow-hidden relative ">
            <div className="absolute inset-0 ">
                <img
                 src="src/assets/images/image_014.jpg"
                 alt=""
                 className="w-full h-full object-cover object-center" />

                
            </div>
            <div className=" relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8">
            <h2 className=" font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight sm:leading-snug tracking-wide  text-center mb-6 sm:mb-8 max-w-4xl text-blue-shade ">Get Leatest Update By Subscribe <br className="hidden md:block" />
          <span className="md:ml-0">our Newslater</span>
</h2>
            <button className="bg-custom-pink hover:bg-pink-500 text-white font-semibold py-3 px-8 sm:px-12 rounded-md text-lg ">Shop Now</button>
          </div>
        </div>

    )
}
export default Banner;