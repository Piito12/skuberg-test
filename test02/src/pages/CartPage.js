import React from "react";
import { useNavigate } from "react-router-dom";
import Cart from "../components/Cart";

const CartPage = (props) => {
  const navigate = useNavigate();

  return (
    <div className="cart-container">
      <div className="header-cart">
        <div>
          <button onClick={() => navigate("/")}>
            BACK TO HOME PAGE
          </button>
        </div>
        <div>
          <button onClick={()=>{
            localStorage.clear()
            window.location.reload()
          }}>Clear</button>
        </div>
      </div>
      <div className="cart-box">
        <Cart />
      </div>
    </div>
  );
};

export default CartPage;
