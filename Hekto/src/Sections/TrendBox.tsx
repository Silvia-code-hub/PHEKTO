
const Box = () =>{
    return(
         <div className="flex gap-[40px] flex-wrap">
                <div className="bg-pink-shade w-[420px] h-[270px] pl-10">
                    <h3 className="h-[26px] font-semibold text-[26px] leading-[1.00] text-blue-shade">23% off in all products</h3>
                   <button className="text-custom-pink underline text-base font-semibold mt-4">Shop Now</button>
                   <img className="w-[213px] h-[207px] ml-[130px]" src="/src/assets/images/image_09.png" alt="" />
              </div>
                <div className="w-[420px] h-[270px] bg-light-blue-shade pl-10">
                    <h3 className="h-[26px] font-semibold text-[26px] leading-[1.00] text-blue-shade">23% off in all products</h3>
                   <button className="text-custom-pink underline text-base font-semibold mt-4">View Collection</button>
                   <img className="-mt-[140px]" src="/src/assets/images/image_06.png" alt="" />
               </div>
               <div className="flex flex-col w-[267px] h-[74px] gap-[10px]">
                 <div className="w-[64px] h-[71px] bg-white-gray flex">
                     <img src="/src/assets/images/image_010.png" alt="" />
                     <div className="flex flex-col w-[151px] h-[33px] ml-5">
                       <p className="text-blue-shade font-semibold text-base w-[151px]  ">Executive Seat chair </p>
                       <div className="font-normal text-xs text-blue-shade line-through">${32.00.toFixed(2)}</div>
                     </div>
                     
                 </div>
                   <div className="w-[64px] h-[71px] bg-white-gray flex">
                     <img src="/src/assets/images/image_08.png" alt="" />
                      <div className="flex flex-col w-[151px] h-[33px] ml-5">
                       <p className="text-blue-shade font-semibold text-base w-[151px]">Executive Seat chair </p>
                       <div className="font-normal text-xs text-blue-shade line-through">${32.00.toFixed(2)}</div>
                     </div>
                   </div>
                   <div className="w-[64px] h-[71px] bg-white-gray flex">
                     <img src="/src/assets/images/image_011.png" alt="" />
                      <div className="flex flex-col w-[151px] h-[33px] ml-5">
                       <p className="text-blue-shade font-semibold text-base w-[151px]">Executive Seat chair </p>
                       <div className="font-normal text-xs text-blue-shade line-through">${32.00.toFixed(2)}</div>
                     </div>
                   </div>
               </div>
            </div>

    )
}
export default Box;