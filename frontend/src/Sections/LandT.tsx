import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Features = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { addToCart } = useCart();

   
    const FEATURED_SOFA_ID = 30;
    const FEATURED_SOFA_NAME = ' B&B Italian sofa';
    const FEATURED_SOFA_PRICE = 32.00;

    
    const FEATURED_SOFA_IMAGE = "https://res.cloudinary.com/dua4go47y/image/upload/v1777010252/products/sofa2.png";

    const handleAddToCart = async () => {
        if (!user) {
            alert('Please login to add items to cart');
            navigate('/login');
            return;
        }

        try {
            await addToCart(FEATURED_SOFA_ID, 1);
            alert('Added to cart!');
            navigate('/shopping-cart');
        } catch (err: any) {
            console.error('Add to cart error:', err);
            alert(err.response?.data?.error || 'Failed to add to cart');
        }
    };

    return (
        <div className="bg-purple-shade flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 py-8 lg:py-12 gap-8 lg:gap-12 w-full">
            <div className="features-image w-full lg:w-1/2 flex justify-evenly">
                <img
                    src={FEATURED_SOFA_IMAGE}
                    className="w-full max-w-[400px] lg:max-w-none h-auto object-contain"
                    alt={FEATURED_SOFA_NAME}
                />
            </div>

            <div className="features-info w-full lg:w-1/2">
                <h2 className="font-bold text-2xl sm:text-3xl lg:text-[35px] leading-tight sm:leading-snug lg:leading-[1.32] tracking-wide text-blue-shade text-left mb-4 lg:mb-6">
                    Unique Features Of leatest & Trending Products
                </h2>

                <div className="space-y-3 lg:space-y-4 mb-6 lg:mb-8">
                    <div className="flex items-start gap-3">
                        <div className="w-3 h-3 rounded-full bg-pink-500 mt-1.5 flex-shrink-0"></div>
                        <p className="font-medium text-shade-gray leading-relaxed text-sm sm:text-base">
                            All frames constructed with hardwood solids and laminates
                        </p>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-3 h-3 rounded-full bg-purple mt-1.5 flex-shrink-0"></div>
                        <p className="font-medium text-shade-gray leading-relaxed text-sm sm:text-base">
                            Reinforced with double wood dowels, glue, screw - nails corner blocks and machine nails
                        </p>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-3 h-3 rounded-full bg-green-500 mt-7 flex-shrink-0"></div>
                        <p className="font-medium text-shade-gray leading-relaxed text-sm sm:text-base mt-4 lg:mt-7">
                            Arms, backs and seats are structurally reinforced
                        </p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                    <button
                        onClick={handleAddToCart}
                        className="bg-custom-pink text-white px-6 py-3 sm:px-8 sm:py-3 rounded hover:bg-pink-600 transition-colors text-sm sm:text-base font-medium whitespace-nowrap cursor-pointer"
                    >
                        Add To Cart
                    </button>

                    <div className="flex flex-row sm:flex-col items-start gap-1">
                        <p className="text-blue-shade font-medium text-sm sm:text-base">
                            {FEATURED_SOFA_NAME}
                        </p>
                        <div className="text-blue-shade font-medium text-sm sm:text-xl">
                            ${FEATURED_SOFA_PRICE.toFixed(2)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;