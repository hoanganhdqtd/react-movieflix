import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { IMAGE_BASE_URL } from "../app/config";
import { AiFillPlayCircle, AiOutlineClose } from "react-icons/ai";
import { MdOutlineFavorite } from "react-icons/md";
import NoImage from "../NoImage.jpg";
import Trailers from "./Trailers";
import { MovieContext } from "../contexts/MovieContext";
import { NavLink, Routes, Route, Navigate } from "react-router-dom";
// import { useNavigation } from "@react-navigation/native";
import MovieDetail from "./MovieDetail";

// You rendered descendant <Routes>
// (or called `useRoutes()`) at "/"
// (under <Route path="/">) but the parent route path
// has no trailing "*". This means if you navigate deeper,
// the parent won't match anymore and therefore the child
// routes will never render.

// Please change the parent <Route path="/"> to <Route path="*">.

// No routes matched location "/detail/502356"

function MoviesList() {
  const {
    addFavourite,
    inputValue,
    getMovieTitle,
    getMovies,
    movies,
    playTrailer,
    movieTitle,
    trailer,
    setTrailer,
    isLoading,
    setIsLoading,
  } = useContext(MovieContext);

  const [toggle, setToggle] = useState(true);
  // const [movies, setMovies] = useState([]);
  // const [trailer, setTrailer] = useState(true);
  // const [movieTitle, setMovieTitle] = useState("");

  console.log("inputValue", inputValue);

  useEffect(() => {
    getMovies();
  }, [inputValue]);

  return (
    <Fragment>
      <div className={toggle ? "mainBgColor" : "secondaryBgColor"}>
        {isLoading ? (
          <h1 style={{ textAlign: "center" }}>Loading...</h1>
        ) : !movies.length ? (
          <h1 style={{ textAlign: "center" }}>No results</h1>
        ) : (
          <div className="movies-container">
            {movies.map((movie) => (
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
                    onClick={() => playTrailer(movie)}
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
                      // to={`/detail/${movie.id}`}
                      // element={<MovieDetail movie={movie} />}

                      element={<Navigate to=<MovieDetail movie={movie} /> />}
                      // element={<Navigate to=<MovieDetail state{movie={movie}} /> />}
                    />
                  </Routes> */}
                </div>
              </Fragment>
            ))}
            {!trailer && <Trailers movieTitle={movieTitle} toggle={toggle} />}
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
        }
      </div>
    </Fragment>
  );
}

export default MoviesList;
