import React, { useEffect } from "react";
import { useMovieContext } from "../contexts/moviecontext";
import Navbar from "../components/NavBar";
import MovieList from "../components/Movies";

const HomePage = (props) => {
  const { movies, search, getMovies } = useMovieContext();

  useEffect(() => {
    getMovies(search);
  }, []);

  return (
    <>
      <div className="homepage">
        <div className="header-container">
          <Navbar />
        </div>
        <div className="movies-container">
          {movies.isLoading ? (
            <div>Loading...</div>
          ) : movies.movies.length > 0 ? (
            <>
                <MovieList/>
            </>
          ) : movies.error ? (
            <div>{movies.error}</div>
          ) : <p>PLEASE IS MISTAKE!!</p>}
        </div>
      </div>
    </>
  );
};

export default HomePage;
