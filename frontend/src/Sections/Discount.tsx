import { TiTick } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

const Feature = () => {
    const navigate = useNavigate();

   
    const FEATURED_PRODUCT_IMAGE = "https://res.cloudinary.com/dua4go47y/image/upload/v1777010164/products/image_012.png";

    const handleShopNow = () => {
        navigate('/products');
    };

    return (
        <div className="flex gap-[30px] justify-center mt-5 flex-wrap">
            <div className=" ">
                <h2 className="text-blue-shade font-bold text-[35px] text-left">
                    20% Discount Of All Products
                </h2>
                <h4 className="mt-3 text-custom-pink font-normal text-[21px] leading-[1.32] tracking-[1.5%]">
                    Eams Sofa Compact
                </h4>
                <p className="text-gray-faint font-normal text-[17px] leading-[30px] tracking-[2%] w-[523px] h-[49px] mt-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu eget feugiat habitasse nec, bibendum condimentum.
                </p>
                <div className="flex gap-[40px]">
                    <div className="flex flex-col gap-[10px]">
                        <p className="text-gray-faint mt-5">
                            <span className="mr-5 "><TiTick /></span>Material expose like metals
                        </p>
                        <p className="text-gray-faint mt-5">
                            <span className="mr-5"><TiTick /></span>Simple neutral colours.
                        </p>
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <p className="text-gray-faint mt-5">
                            <span className="mr-5"><TiTick /></span>Clear lines and geomatric figures
                        </p>
                        <p className="text-gray-faint mt-5">
                            <span className="mr-5"><TiTick /></span>Material expose like metals
                        </p>
                    </div>
                </div>

                <button
                    onClick={handleShopNow}
                    className="bg-custom-pink text-white p-3 w-[200px] h-[57px] font-normal text-[17px] leading-[1.00] tracking-[2%] mt-5 cursor-pointer hover:bg-pink-600 transition-colors rounded"
                >
                    Shop Now
                </button>
            </div>

            <div className="item-image">
                <img
                    src={FEATURED_PRODUCT_IMAGE}
                    alt="Eams Sofa Compact"
                    className="w-full max-w-[400px] lg:max-w-none h-auto object-contain"
                />
            </div>
        </div>
    );
};

export default Feature;