import React, { useEffect, useState } from "react";
import "./cart.scss";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");

    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const handleRemove = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleIncrease = (itemId) => {
    const updatedCart = [...cartItems];
    const existingItem = updatedCart.find((item) => item.id === itemId);

    if (existingItem) {
      existingItem.quantity += 1;
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const handleDecrease = (itemId) => {
    const updatedCart = [...cartItems];
    const existingItem = updatedCart.find((item) => item.id === itemId);

    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        updatedCart.splice(updatedCart.indexOf(existingItem), 1);
      }
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const calculateCartTotal = () => {
    let total = "";
    cartItems.forEach((item) => {
      const itemTotal = item.quantity * item.product.price;
      total += itemTotal;
    });
    return total;
  };

  return (
    <div className="cart_container">
      <h3 className="cart_title">Giỏ hàng</h3>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng trống.</p>
      ) : (
        <div>
          <ul className="cart_items">
            {cartItems.map((item) => (
              <li key={item.id} className="cart_item">
                <img
                  className="cart_img"
                  src={item.product.image}
                  alt={item.product.product_name}
                />
                <div className="cart_item_info">
                  <h4>{item.product.product_name}</h4>
                  <p>{item.product.price}</p>
                  <p>Số lượng: {item.quantity}</p>
                </div>
                <button onClick={() => handleRemove(item.id)}>Xoá</button>
                <button onClick={() => handleIncrease(item.id)}>Tăng</button>
                <button onClick={() => handleDecrease(item.id)}>Giảm</button>
              </li>
            ))}
          </ul>
          <p>Tổng giá trị giỏ hàng: {calculateCartTotal()}</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
