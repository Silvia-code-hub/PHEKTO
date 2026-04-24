import React, { useState } from "react";
import Layout from "../Components/layout";


interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
}


const productImages: Record<string, string> = {
  "image_052": "https://res.cloudinary.com/dua4go47y/image/upload/v1777010210/products/image_052.jpg",
  "image_053": "https://res.cloudinary.com/dua4go47y/image/upload/v1777010211/products/image_053.jpg",
  "image_054": "https://res.cloudinary.com/dua4go47y/image/upload/v1777010212/products/image_054.jpg",
  "image_055": "https://res.cloudinary.com/dua4go47y/image/upload/v1777010213/products/image_055.jpg",
  "image_056": "https://res.cloudinary.com/dua4go47y/image/upload/v1777010214/products/image_056.jpg",
};

const ShoppingCart: React.FC = () => {
  
  const initialCartItems: CartItem[] = [
    { id: 1, name: 'Ut diam consequat', price: 32.00, image: '', quantity: 1, size: 'XL' },
    { id: 2, name: 'Vel faucibus posuere', price: 32.00, image: '', quantity: 1, size: 'XL' },
    { id: 3, name: 'Ac vitae vestibulum', price: 32.00, image: '', quantity: 1, size: 'XL' },
    { id: 4, name: 'Elit massa diam', price: 32.00, image: '', quantity: 1, size: 'XL' },
    { id: 5, name: 'Proin pharetra elementum', price: 32.00, image: '', quantity: 1, size: 'XL' },
  ];
  
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);

  
  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      handleRemoveItem(id);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  
  const handleIncrement = (id: number, currentQuantity: number) => {
    handleUpdateQuantity(id, currentQuantity + 1);
  };

  
  const handleDecrement = (id: number, currentQuantity: number) => {
    if (currentQuantity > 1) {
      handleUpdateQuantity(id, currentQuantity - 1);
    } else {
      handleRemoveItem(id);
    }
  };

  
  const handleRemoveItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  
  const handleClearCart = () => {
    setCartItems([]);
  };

  
  const calculateSubtotal = (): number => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  
  const calculateTotal = (): number => {
    const subtotal = calculateSubtotal();
    const taxesAndShipping = subtotal * 0.15;
    return subtotal + taxesAndShipping;
  };

  
  const calculateItemTotal = (price: number, quantity: number): number => {
    return price * quantity;
  };

  
  const getProductImage = (itemName: string): string => {
    
    const imageMapping: Record<string, string> = {
      'Ut diam consequat': 'image_056',
      'Vel faucibus posuere': 'image_054',
      'Ac vitae vestibulum': 'image_053',
      'Elit massa diam': 'image_055',
      'Proin pharetra elementum': 'image_052',
    };
    
    const imageKey = imageMapping[itemName];
    
    if (imageKey && productImages[imageKey]) {
      
      return productImages[imageKey].replace('/upload/', '/upload/w_200,h_200,c_fill,q_auto,f_auto/');
    }
    
    
    return `https://placehold.co/400x400/pink/white?text=${encodeURIComponent(itemName.slice(0, 10))}`;
  };
  
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <div className="bg-white">
      <Layout>
        <div className="bg-[#f6f5ff] py-16 mb-12">
          <div className="container mx-auto px-4 md:px-8 lg:px-16">
            <h1 className="text-4xl font-bold text-deep-blue mb-4">Shopping Cart</h1>
            <div className="flex items-center gap-2 text-sm">
              <button className="text-deep-blue hover:text-custom-pink font-semibold transition">Home</button>
              <span className="text-black">•</span>
              <button className="text-deep-blue hover:text-custom-pink font-semibold transition">Pages</button>
              <span className="text-black">•</span>
              <button className="text-custom-pink font-semibold">Shopping Cart</button>
            </div>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="container mx-auto px-4 md:px-8 lg:px-16 py-20 text-center">
            <p className="text-gray-500 text-lg">Your cart is empty</p>
          </div>
        ) : (
          <div className="container mx-auto px-4 md:px-8 lg:px-16 pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
             
              <div className="lg:col-span-2">
                
                <div className="hidden md:grid grid-cols-12 py-4 px-4 rounded-md mb-4">
                  <div className="col-span-5 font-semibold text-[#101750]">Product</div>
                  <div className="col-span-2 font-semibold text-[#101750]">Price</div>
                  <div className="col-span-2 font-semibold text-[#101750]">Quantity</div>
                  <div className="col-span-2 font-semibold text-[#101750]">Total</div>
                  <div className="col-span-1"></div>
                </div>

                
                <div className="space-y-2">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="relative border border-gray-100 rounded-lg p-4 transition-all"
                      onMouseEnter={() => setHoveredItemId(item.id)}
                      onMouseLeave={() => setHoveredItemId(null)}
                    >
                     
                      <div className="md:hidden">
                        <div className="flex gap-4">
                          <div className="relative w-24 h-24 bg-gray-100 rounded flex-shrink-0">
                            <img 
                              src={getProductImage(item.name)} 
                              alt={item.name}
                              className="w-full h-full object-cover rounded"
                            />
                            {hoveredItemId === item.id && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveItem(item.id);
                                }}
                                className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-all z-20 shadow-md text-lg font-bold"
                              >
                                ×
                              </button>
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-[#101750]">{item.name}</h3>
                            <p className="text-sm text-gray-500">Size: {item.size}</p>
                            <p className="text-[#fb2e86] font-semibold mt-2">${item.price.toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-4 pt-4 border-t">
                          
                          <div>
                            <label className="text-sm text-gray-500 block mb-2">Quantity</label>
                            <div className="inline-flex items-center bg-gray-100 rounded-md overflow-hidden">
                              <button
                                onClick={() => handleDecrement(item.id, item.quantity)}
                                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-300 transition-colors font-bold text-lg"
                              >
                                −
                              </button>
                              <span className="min-w-[32px] text-center text-gray-700 font-medium bg-gray-100">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleIncrement(item.id, item.quantity)}
                                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-300 transition-colors font-bold text-lg"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="font-semibold text-[#101750]">
                            ${calculateItemTotal(item.price, item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>

                      
                      <div className="hidden md:grid grid-cols-12 items-center gap-4">
                        <div className="col-span-5 flex items-center gap-4">
                          <div className="relative w-20 h-20 bg-gray-100 rounded flex-shrink-0">
                            <img 
                              src={getProductImage(item.name)} 
                              alt={item.name}
                              className="w-full h-full object-cover rounded"
                            />
                            {hoveredItemId === item.id && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveItem(item.id);
                                }}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-all z-20 shadow-md text-sm font-bold"
                              >
                                ×
                              </button>
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-[#101750]">{item.name}</h3>
                            <p className="text-sm text-gray-500">Size: {item.size}</p>
                          </div>
                        </div>
                        <div className="col-span-2 text-[#101750]">${item.price.toFixed(2)}</div>
                        
                        
                        <div className="col-span-2">
                          <div className="inline-flex items-center bg-gray-100 rounded-md overflow-hidden">
                            <button
                              onClick={() => handleDecrement(item.id, item.quantity)}
                              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-300 transition-colors font-bold text-lg"
                            >
                              −
                            </button>
                            <span className="min-w-[32px] text-center text-gray-700 font-medium bg-gray-100">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleIncrement(item.id, item.quantity)}
                              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-300 transition-colors font-bold text-lg"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        
                        <div className="col-span-2 font-semibold text-[#101750]">
                          ${calculateItemTotal(item.price, item.quantity).toFixed(2)}
                        </div>
                        <div className="col-span-1"></div>
                      </div>
                    </div>
                  ))}
                </div>

                
                <div className="flex justify-between gap-4 mt-8">
                  <button 
                    className="px-6 py-3 bg-[#fb2e86] text-white rounded-md hover:bg-[#e01c6f] transition-all"
                    onClick={() => {}}
                  >
                    Update Cart
                  </button>
                  <button 
                    className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-700 transition-all"
                    onClick={handleClearCart}
                  >
                    Clear Cart
                  </button>
                </div>
              </div>

              
              <div className="lg:col-span-1 space-y-6">
                
                <div className="p-6 rounded-lg">
                  <h2 className="text-xl font-bold text-big-blue mb-6 text-center">Cart Totals</h2>
                  <div className="space-y-4 bg-[#f4f4fc] p-4 rounded-md">
                    <div className="flex justify-between pb-3 border-b border-gray-200">
                      <span className="text-big-blue font-semibold">Subtotals:</span>
                      <span className="text-text-blue font-medium">${calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pb-3 border-b border-gray-200">
                      <span className="text-big-blue font-semibold">Totals:</span>
                      <span className="text-text-blue font-semibold text-lg">${calculateTotal().toFixed(2)}</span>
                    </div>
                    <label className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
                        className="w-3 h-3 rounded border-gray-300 text-green-600 focus:ring-green-500 accent-green-600 mt-3"
                      />
                      <span className="text-sm text-gray-500 mt-4">
                        Shipping & taxes calculated at checkout
                      </span>
                    </label>
                    <button className="w-full mt-4 px-6 py-3 bg-light-green text-white rounded-md hover:bg-green-500 transition-all">
                      Proceed To Checkout
                    </button>
                  </div>
                </div>

                
                <div className="p-6 rounded-lg">
                  <h2 className="text-xl font-bold text-big-blue mb-6 text-center">Calculate Shipping</h2>
                  <div className="space-y-4 bg-[#f4f4fc] p-4 rounded-md">
                    <select className="w-full appearance-none px-4 py-3 border-b border-b-gray-300 rounded-md focus:outline-none text-gray-light bg-[#f4f4fc]">
                      <option>Bangladesh</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Canada</option>
                    </select>
                    <select className="w-full appearance-none px-4 py-3 border-b border-b-gray-300 rounded-md focus:outline-none text-gray-light bg-[#f4f4fc]">
                      <option>Marque Dhaka, 1200</option>
                      <option>New York, 10001</option>
                      <option>London, SW1A 1AA</option>
                    </select>
                    <input 
                      type="text" 
                      placeholder="Postal Code" 
                      className="w-full px-4 py-3 border-b border-b-gray-300 rounded-md focus:outline-none bg-[#f4f4fc]"
                    />
                    <button className="w-full px-6 py-3 bg-[#fb2e86] text-white rounded-md hover:bg-[#e01c6f] transition-all">
                      Calculate Shipping
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </div>
  );
};

export default ShoppingCart;