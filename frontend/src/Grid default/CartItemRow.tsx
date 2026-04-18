import React from "react";
import type { CartItem } from "./ShoppingCartitems";

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

const CartItemRow: React.FC<CartItemRowProps> = ({ 
  item, 
  onUpdateQuantity, 
  onRemoveItem 
}) => {
  const handleQuantityChange = (newQuantity: number) => {
    onUpdateQuantity(item.id, newQuantity);
  };

  const calculateItemTotal = (price: number, quantity: number): number => {
    return price * quantity;
  };

  return (
    <div className="cart-item-row">
      <div className="item-product">
        <span className="item-image">{item.image}</span>
        <span className="item-name">{item.name}</span>
      </div>
      
      <div className="item-price">
        ${item.price.toFixed(2)}
      </div>
      
      <div className="item-quantity">
        <button 
          className="quantity-btn"
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          -
        </button>
        <span className="quantity-display">{item.quantity}</span>
        <button 
          className="quantity-btn"
          onClick={() => handleQuantityChange(item.quantity + 1)}
        >
          +
        </button>
      </div>
      
      <div className="item-total">
        ${calculateItemTotal(item.price, item.quantity).toFixed(2)}
      </div>
      
      <div className="item-actions">
        <button 
          className="remove-btn"
          onClick={() => onRemoveItem(item.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItemRow;