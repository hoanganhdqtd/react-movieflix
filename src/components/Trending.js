import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import { useContext } from "react";
import apiService from "../app/apiService";
import { TMDB_KEY, IMAGE_BASE_URL } from "../app/config";
import { AiFillPlayCircle, AiOutlineClose } from "react-icons/ai";
import { MdOutlineFavorite } from "react-icons/md";
import NoImage from "../NoImage.jpg";
import { MovieContext } from "../contexts/MovieContext";
import Trailers from "./Trailers";

import { NavLink } from "react-router-dom";
// import {Routes, Route} from "react-router-dom";
// import MovieDetail from "./MovieDetail";

function Trending() {
  const {
    toggle,
    inputValue,
    addFavourite,
    getMovieTitle,
    trailer,
    setTrailer,
    isLoading,
    setIsLoading,
  } = useContext(MovieContext);

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTitle, setTrendingTitle] = useState("");
  // const [trailer, setTrailer] = useState(true);

  console.log("inputValue", inputValue);
  const apiEndpoint = inputValue ? "search/movie" : "trending/all/day";

  const getTrending = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.get(`${apiEndpoint}`, {
        params: {
          api_key: TMDB_KEY,
          query: inputValue,
        },
      });
      console.log("trending", response);
      console.log(response.data.results);
      setTrendingMovies(response.data.results);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getTrending();
  }, [inputValue]);

  const playTrendingTrailer = (movie) => {
    setTrendingTitle(getMovieTitle(movie));
    setTrailer(!trailer);
  };

  return (
    <Fragment>
      <div className={toggle ? "mainBgColor" : "secondaryBgColor"}>
        {isLoading ? (
          <h1 style={{ textAlign: "center" }}>Loading...</h1>
        ) : !trendingMovies.length ? (
          <h1 style={{ textAlign: "center" }}>No results</h1>
        ) : (
          <div className="movies-container">
            {trendingMovies.map((movie) => (
              <Fragment key={movie.id}>
                <div id={trailer ? "container" : "NoContainer"}>
                  <MdOutlineFavorite
                    id={trailer ? "likeIcon" : "hide"}
                    fontSize={40}
                    color="red"
                    onClick={() => addFavourite(movie)}
                  />
                  <AiFillPlayCircle
                    color="green"
                    fontSize={40}
                    id={trailer ? "playIcon" : "hide"}
                    onClick={() => playTrendingTrailer(movie)}
                  />
                  <NavLink
                    to={{ pathname: `/detail/${movie.id}` }}
                    // style={{ textDecoration: "none !important" }}
                  >
                    <img
                      src={
                        movie.poster_path
                          ? `${IMAGE_BASE_URL}${movie.poster_path}`
                          : NoImage
                      }
                      alt={getMovieTitle(movie)}
                      // onClick={() => moviesTitle(movie)}
                    />
                    <h3
                      className={toggle ? "DarkTheme" : "LightThemeClose"}
                      id={
                        getMovieTitle(movie).length > 28
                          ? "smaller-Text"
                          : "larger-Text"
                      }
                    >
                      {getMovieTitle(movie).length > 40
                        ? getMovieTitle(movie).slice(0, 40) + "..."
                        : getMovieTitle(movie)}
                    </h3>
                  </NavLink>

                  {/* <Routes>
                    <Route
                      to={`/detail/${movie.id}`}
                      element={<MovieDetail movie={movie} />}
                    />
                  </Routes> */}
                </div>
              </Fragment>
            ))}
            {!trailer && (
              <Trailers movieTitle={trendingTitle} toggle={toggle} />
            )}
            <AiOutlineClose
              id={trailer ? "Nothing" : "Exit1"}
              className={toggle ? "DarkTheme" : "LightThemeClose"}
              fontSize={50}
              color={toggle ? "#fff" : "#ff206e"}
              cursor={"pointer"}
              onClick={() => setTrailer(true)}
            />
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default Trending;
