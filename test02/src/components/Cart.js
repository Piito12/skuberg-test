import React, { useState, useEffect } from "react";
import { useMovieContext } from "../contexts/moviecontext";

const Cart = () => {
  const { cart, setCart } = useMovieContext();

  const [total, setTotal] = useState(0);
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [countDown, setCountDown] = useState(60);
  const [address, setAddress] = useState(false);
  const [amount , setAmount] = useState(0);

  const handleRemove = (id) => {
    let tempCart = [...cart];
    tempCart = tempCart.filter((item) => item.id !== id);
    setCart(tempCart);
  };

  const handleAddQuantity = (id) => {
    const tempCart = [...cart];
    const selectedMovie = tempCart.find((item) => item.id === id);
    const index = tempCart.indexOf(selectedMovie);
    selectedMovie.quantity += 1;
    tempCart[index] = selectedMovie;
    setCart(tempCart);
  };

  const handleRemoveQuantity = (id) => {
    const tempCart = [...cart];
    const selectedMovie = tempCart.find((item) => item.id === id);
    const index = tempCart.indexOf(selectedMovie);
    if (selectedMovie.quantity === 1) return handleRemove(id);
    selectedMovie.quantity -= 1;
    tempCart[index] = selectedMovie;
    setCart(tempCart);
  };

  const handleTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total += 19 * item.quantity;
    });
    setTotal(total);
  };

  const handleTotalAmount = () =>{
   
    let toltalAmount = 0;
    cart.forEach((item)=>{
        toltalAmount += item.quantity;
    })
    setAmount(toltalAmount);
  }
  
  const handleDiscount = () => {
    let temptotal = total;
        temptotal = temptotal - (temptotal * 0.1);  
        setTotal(temptotal);
  };

  useEffect(() => {
    handleTotal();
    handleTotalAmount();
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart,total]);

  useEffect(() => {
    if (countDown > 0) {
      setTimeout(() => {
        setCountDown(countDown - 1);
      }, 1000);
    }
  },[countDown]);

  return (
    <div className="cart-items">
      <div className="cart-warpper">
        {cart.length === 0 && <h1>NO MOVIES IN CART!</h1>}
        {cart.map((item) => {
          return (
            <div key={item.id} className="cart-item">
              <button
                className="delete-button"
                onClick={() => handleRemove(item.id)}
              >
                x
              </button>
              <div className="cart-item-image">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                  alt={item.title}
                />
              </div>
              <div className="cart-item-info">
                <p> {item.title}</p>
                <span>#{item.id}</span>
                <h3> {item.prize}</h3>
                <div className="prize-actions">
                  <button onClick={() => handleRemoveQuantity(item.id)}>
                    -
                  </button>
                  <h1> {item.quantity}</h1>
                  <button
                    onClick={() => {
                      handleAddQuantity(item.id);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="total-sections">
        <h1>Amount : {amount} </h1>
        
        { amount > 2 && amount < 5  ? (<h1>SUBTOTAL : {Math.floor((total*0.9))}.00$  Discount : 10% </h1>)
        : amount >=5  ? (<h1>SUBTOTAL : {Math.floor((total*0.8))}.00$  Discount : 20% </h1>)
        : <h1>SUBTOTAL : {total}.00$ </h1>}
        <button
          onClick={() => {
            setIsCheckOut(!isCheckOut);
            setCountDown(60)
          }}
        >
          <h1>Check Out</h1>
        </button>
        {address ? (<h1>THANK YOU LET'ENJOY!!</h1>):null}
        {isCheckOut ? (
          <div className="address-section">
            <h1 className="countdown">{countDown}</h1>
            <h1>Address Detail</h1>
            <form
              onSubmit={() => {
                setCountDown(1)
                setIsCheckOut(!isCheckOut);
                setAddress(!address);
                localStorage.clear()
                Window.location.reload()
              }}
            >
                <label htmlFor="email">
                Creadit Cart Number
                <input type="text" alt="name" />
              </label>
              <label htmlFor="name">
                Full name
                <input type="text" alt="name" />
              </label>
              <label htmlFor="number">
                Phone number
                <input type="text" alt="name" />
              </label>
              <label htmlFor="email">
                Email
                <input type="text" alt="name" />
              </label>
              <label htmlFor="address">
                Address
                <input type="text" alt="name" />
              </label>
              <label htmlFor="city">
                City
                <input type="text" alt="name" />
              </label>
              <label htmlFor="state">
                State
                <input type="text" alt="name" />
              </label>
              <label htmlFor="zip-code">
                Zip code
                <input type="text" alt="name" />
              </label>
              <button type="submit">Submit</button>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Cart;
