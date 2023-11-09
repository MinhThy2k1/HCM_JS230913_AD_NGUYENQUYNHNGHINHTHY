import React, { useState, useEffect } from "react";
import "./product.scss";
import Datajs from "../../../data.json";
import Cart from "../carts/Cart";

export default function Product({ randomid }) {
  const [products, setProducts] = useState([Datajs]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const storedProducts = localStorage.getItem("products");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts(Datajs.products);
      localStorage.setItem("products", JSON.stringify(Datajs.products));
    }
  }, []);
  useEffect(() => {
    if (showCart) {
      document.querySelector(".cart_container").style.display = "block";
    } else {
      document.querySelector(".cart_container").style.display = "none";
    }
  }, [showCart]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (product) => {
    const productToAdd = {
      id: randomid(),
      product: product,
      quantity: 1,
    };
    const updatedCart = [...cart, productToAdd];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleClick = () => {
    setShowCart(!showCart);
  };

  return (
    <div className="product_container">
      <div className="product_container_title">
        <h3 className="product_title_content">Trang chủ Danh sách sản phẩm</h3>
        <h3 className="crat_icon" onClick={handleClick}>
          <i className="fa-solid fa-cart-shopping"></i>
        </h3>
        <span className="row_red">{cart.length}</span>
      </div>
      <div>
        <h2>Danh Sách Sản Phẩm</h2>
      </div>
      <div className="product_container_list">
        {products.map((item) => (
          <div key={item.id} className="product_item">
            <img src={item.image} alt={item.product_name} />
            <div className="product_info">
              <h4>{item.product_name}</h4>
              <p>{item.price}</p>
              <button
                className="btn btn-primary"
                onClick={() => handleAddToCart(item)}
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        ))}
      </div>
      {showCart && <Cart cartItems={cart} />}
    </div>
  );
}
