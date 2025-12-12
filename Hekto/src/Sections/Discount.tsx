
import { TiTick } from "react-icons/ti";
interface Feature {
  id: number;
  text: string;
}
const Feature =() =>{
   
    return(
        <div className="flex gap-[30px] justify-center mt-5 flex-wrap">
            <div className=" ">
                <h2 className="text-blue-shade font-bold text-[35px] text-left">20% Discount Of All Products</h2>
                <h4 className="mt-3 text-custom-pink font-normal text-[21px] leading-[1.32] tracking-[1.5%]">Eams Sofa Compact</h4>
                <p className="text-gray-faint font-normal text-[17px] leading-[30px] tracking-[2%] w-[523px] h-[49px] mt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu eget feugiat habitasse nec, bibendum condimentum.</p>
                <div className="flex gap-[40px]">
                    <div className="flex flex-col gap-[10px]">
                        <p className="text-gray-faint mt-5"> <span className="mr-5 "><TiTick/></span>Material expose like metals</p>
                        <p className="text-gray-faint mt-5"> <span className="mr-5"><TiTick/></span>Simple neutral colours.</p>
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <p className="text-gray-faint mt-5"> <span className="mr-5"><TiTick/></span>Clear lines and geomatric figures</p>
                        <p className="text-gray-faint mt-5"> <span className="mr-5"><TiTick/></span>Material expose like metals</p>
                    </div>
                </div>
                {/* <div className="flex  flex-col gap-[5px] mt-5 text-gray-faint">
                    {items.map((item) => (
                 <div key={item.id} className="">
                     <span className="mt-4 ml-1"><TiTick/></span>
                        <span className="w-[238px] h-[30px] mt-3">{item.text}</span>
                    </div>
                    ))}
                </div> */}
                <button className="bg-custom-pink text-white p-3 w-[200px] h-[57px] font-normal text-[17px] leading-[1.00] tracking-[2%] mt-5"> Shop Now</button>

            </div>
            <div className="item-image">
                <img src="src/assets/images/image_012.png" alt="" />

            </div>
        </div>

    )
}
export default Feature;