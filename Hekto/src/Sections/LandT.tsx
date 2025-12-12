
const features = () =>{
    return(
      <div className="bg-purple-shade flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 py-8 lg:py-12 gap-8 lg:gap-12 w-full ">
        <div className="features-image w-full lg:w-1/2 flex justify-evenly ">
        <img 
        src="/src/assets/images/sofa2.png" 
        className="w-full max-w-[400px] lg:max-w-none h-auto object-contain" />
      </div>
      <div className="features-info w-full lg:w-1/2">
        <h2 className="font-bold text-2xl sm:text-3xl lg:text-[35px] leading-tight sm:leading-snug lg:leading-[1.32] tracking-wide text-blue-shade text-left mb-4 lg:mb-6">Unique Features Of leatest &
Trending Products</h2>
<div className="space-y-3 lg:space-y-4 mb-6 lg:mb-8">
  <p className="font-medium text-shade-gray leading-relaxed text-sm sm:text-base ">All frames constructed with hardwood solids and laminates</p>
<p className="font-medium text-shade-gray leading-relaxed text-sm sm:text-base ">Reinforced with double wood dowels, glue, screw - nails corner 
blocks and machine nails</p>
<p className="font-medium text-shade-gray leading-relaxed text-sm sm:text-base mt-4 lg:mt-7">Arms, backs and seats are structurally reinforced</p>

</div>


<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
  <button className="bg-custom-pink text-white px-6 py-3 sm:px-8 sm:py-3 rounded hover:bg-pink-600 transition-colors text-sm sm:text-base font-medium whitespace-nowrap">Add To Cart</button>
  <div className="flex flex-row sm:flex-col items-start  gap-1  "> 
    <p className="text-blue-shade font-medium text-sm sm:text-base">B&B Italian Sofa </p>
<div className="text-blue-shade font-medium text-sm sm:text-xl">${32.00.toFixed(2)}</div>
  </div>
  
</div>



      </div>

       </div>
    )
}
export default features;