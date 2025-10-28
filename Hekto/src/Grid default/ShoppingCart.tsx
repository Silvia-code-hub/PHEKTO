import React, {useState} from "react";
import type { CartItem } from "./ShoppingCartitems";
import Layout from "../Components/layout";
import CartItemRow from "./CartItemRow";
import "./ShoppingCart.css"

const ShoppingCart:React.FC = () => {
   const initialCartItems: CartItem[] = [
    { id: 1, name: 'Ut diam consequat', price: 32, image: 'src/assets/images/image_056.jpg', quantity: 1 },
    { id: 2, name: 'Vel faucibus posuere', price: 32, image: 'src/assets/images/image_054.jpg', quantity: 1 },
    { id: 3, name: 'Ac vitae vestibulum', price: 32, image: 'src/assets/images/image_053.jpg', quantity: 1 },
    { id: 4, name: 'Elit massa diam', price: 32, image: 'src/assets/images/image_055.jpg', quantity: 1 },
    { id: 5, name: 'Proin pharetra elementum', price: 32, image: 'src/assets/images/image_052.jpg', quantity: 1 },
   ];
    const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

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
   const handleRemoveItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const calculateTotal = (): number => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateItemTotal = (price: number, quantity: number): number => {
    return price * quantity;
  };
   return (
   
     
    <div className="shopping-cart">
       <Layout>

      <div className="up-part">
         <h2 className="first-heading"> Shopping Cart</h2>
                <div className="buttons">
                  <div><button className="nav-link">Home</button></div>
                  <ul><li><div><button className="nave-link">Pages</button></div></li></ul>
                  <ul><li><div><button className="nave-link">Shopping cart</button></div></li></ul> 
      </div>
      </div>
      
            {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="cart-table">
            <div className="cart-header">
              <div className="header-product">Product</div>
              <div className="header-price">Price</div>
              <div className="header-quantity">Quantity</div>
              <div className="header-total">Total</div>
              <div className="header-actions">Actions</div>
            </div>
            
            <div className="cart-items">
              {cartItems.map(item => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                />
              ))}
            </div>
            
            <div className="cart-summary">
              <div className="grand-total">
                <strong>Grand Total: ${calculateTotal().toFixed(2)}</strong>
              </div>
            </div>
          </div>
          
          <div className="cart-actions">
            <button 
              className="update-cart-btn"
              onClick={() => {/* You can add update logic here */}}
            >
              Update Cart
            </button>
            <button 
              className="clear-cart-btn"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
      </Layout>
    </div>
    
  );
};
export default ShoppingCart;