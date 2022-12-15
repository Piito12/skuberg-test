import React, { useState, createContext, useContext } from "react";
import axios from "axios";

export const MovieContext = createContext();

const MovieContextProvider = (props) => {
  const [movies, setMovies] = useState({
    isLoading: true,
    movies: [],
    error: null,
  });
  const localCart = JSON.parse(localStorage.getItem("cart")) || [];
  const [cart, setCart] = useState([...localCart]);
  const [search, setSearch] = useState("");

  console.log(cart);

  const getMovies = async () => {
    try {
      setMovies({ isLoading: true });
      const key = process.env.API_KEY || "7f06ad0d5dc1bf1040ff091182799b20";
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${
          search || "a"
        }`
      );
      if (response.data.results.length === 0) alert("No movies found");
      setMovies({
        isLoading: false,
        movies: response.data.results,
        error: null,
      });
      return response.data.results;
    } catch (error) {
      alert("No movies found");
      setMovies({ isLoading: false, movies: [], error: error.message });
      console.log(error);
    }
  };

  const addMovieToCart = (movie) => {
    if (cart.find((item) => item.id === movie.id)) {
      const newCart = cart.filter((item) => {
        if (item.id === movie.id) {
          item.quantity += 1;
        }
        return item;
      });
      setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    } else {
      setCart([...cart, movie]);
      localStorage.setItem("cart", JSON.stringify([...cart, movie]));
    }
  };

  return (
    <MovieContext.Provider
      value={{ movies, search, setSearch, getMovies, cart, addMovieToCart,setCart }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};

const useMovieContext = () => useContext(MovieContext);

export { MovieContextProvider, useMovieContext };
