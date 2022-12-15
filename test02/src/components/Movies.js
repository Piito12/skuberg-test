import React from "react";
import { useMovieContext } from "../contexts/moviecontext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const MovieList = () => {
  const { movies, addMovieToCart} = useMovieContext();
  const [prize, setPrize] = React.useState('19.00$');

  const handleAddToCart = (id) => {
    const movie = movies.movies.find((movie) => movie.id === id);
    movie['prize'] = prize;
    movie['quantity'] = 1
    addMovieToCart(movie);
  }

  return (
    <div className="movies">
      <div className="pagination">
        <Swiper
         modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={"auto"}
          loop={true}
          pagination={{ clickable: true }}
        >
          {movies.movies.map((movie) => {
            return (
              <div key={movie.id}>
                <SwiperSlide className="slide" key={movie.id}>
                  <div className="sug" key={movie.id}>
                    <div className="suggession">
                      <div className="suggession-left">
                        <h1>{movie.title}</h1>
                        <div className="suggession-overview">
                          <p>{movie.overview.length >= 300 ? movie.overview.slice(0,250) + '...' : movie.overview}</p>
                          
                        </div>
                        <p>Popularity : {movie.popularity}</p>
                        <p>Release_date :{movie.release_date} </p>
                        <p>Vote_average : {movie.vote_average}</p>
                        <p>Vote_count : {movie.vote_count}</p>
                        <p>Price : {prize}</p>
                        <div className="button-movies">
                          <button  onClick={()=> handleAddToCart(movie.id) }>Add to Cart</button>
                          <button >Add Price</button>
                        </div>
                      </div>
                      <div className="suggession-right">
                        <img
                          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </div>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default MovieList;
