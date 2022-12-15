import React from "react";
import { MovieContext } from "../contexts/moviecontext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { search, setSearch, getMovies, cart} = React.useContext(MovieContext);

  return (
    <div className="navbar-container">
      <div className="nav-left">
        <h1>Movie App</h1>
      </div>
      <div className="nav-rigth">
        <form onSubmit={(e) => {
          e.preventDefault();
          getMovies(search)
          }}>
          <label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Movie Here!"
            ></input>
          </label>
          <button type="submit">
            <img
              src="https://cdn-icons-png.flaticon.com/512/8915/8915520.png"
              alt="search"
              width={40}
              height={40}
            />
          </button>
        </form>
        <button onClick={()=> navigate('/cart')}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/879/879764.png"
            alt="cart"
            width={40}
            height={40}
          />
          {
            cart.length > 0 && <span>{cart.length}</span>
          }
        </button>
      </div>
    </div>
  );
};

export default Navbar;
