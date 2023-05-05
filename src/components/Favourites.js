import React, { Fragment, useEffect } from "react";
import { AiFillPlayCircle, AiOutlineClose } from "react-icons/ai";
import { MdOutlineFavorite } from "react-icons/md";
import Trailers from "./Trailers";
import NoImage from "../NoImage.jpg";
import { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";
import { IMAGE_BASE_URL } from "../app/config";
import { NavLink, Routes, Route } from "react-router-dom";
import MovieDetail from "./MovieDetail";

function Favourites() {
  const {
    inputValue,
    favouriteList,
    addFavourite,
    removeFavourite,
    movies,
    getMovies,
    getMovieTitle,
    playTrailer,
    movieTitle,
    trailer,
    setTrailer,
    toggle,
  } = useContext(MovieContext);

  // const [toggle, setToggle] = useState(true);
  // const [trailer, setTrailer] = useState(true);
  // const [movieTitle, setMovieTitle] = useState("");

  // const [movies, setMovies] = useState([]);
  // const [newFavouriteList, setNewFavouriteList] = useState(favouriteList);

  // const apiEndpoint = "search/movie";

  console.log("favouriteList", typeof favouriteList);

  // useEffect(() => {
  //   getMovies();
  // }, [inputValue]);

  useEffect(() => {
    getMovies();
  }, [inputValue]);

  if (!inputValue) {
    return (
      <Fragment>
        <div className={toggle ? "mainBgColor" : "secondaryBgColor"}>
          {!favouriteList.length ? (
            <h1 style={{ textAlign: "center" }}>
              No movies added yet. Please pick some.
            </h1>
          ) : (
            <div className="movies-container">
              {favouriteList.map((movie) => (
                <Fragment key={movie.id}>
                  <div id={trailer ? "container" : "NoContainer"}>
                    <MdOutlineFavorite
                      id={trailer ? "likeIcon" : "hide"}
                      fontSize={40}
                      color="red"
                      onClick={() => removeFavourite(movie)}
                    />
                    <AiFillPlayCircle
                      color="green"
                      fontSize={40}
                      id={trailer ? "playIcon" : "hide"}
                      onClick={() => playTrailer(movie)}
                    />
                    {/* <img
                      src={
                        movie.poster_path
                          ? `${imgBase}${movie.poster_path}`
                          : NoImage
                      }
                      alt={getMovieTitle(movie)}
                      onClick={() => playTrailer(movie)}
                    />
                    <h3
                      className={toggle ? "DarkTheme" : "LightThemeClose"}
                      id={
                        getMovieTitle(movie).length > 28 ? "smaller-Text" : ""
                      }
                    >
                      {getMovieTitle(movie)}
                    </h3> */}
                    <NavLink to={{ pathname: `/detail/${movie.id}` }}>
                      <img
                        src={
                          movie.poster_path
                            ? `${IMAGE_BASE_URL}${movie.poster_path}`
                            : NoImage
                        }
                        alt={getMovieTitle(movie)}
                        // onClick={() => playTrailer(movie)}
                      />
                      <h3
                        className={toggle ? "DarkTheme" : "LightThemeClose"}
                        id={
                          getMovieTitle(movie).length > 28
                            ? "smaller-Text"
                            : "larger-Text"
                        }
                      >
                        <span className="movie-content">
                          {getMovieTitle(movie).length > 40
                            ? getMovieTitle(movie).slice(0, 40) + "..."
                            : getMovieTitle(movie)}
                        </span>
                      </h3>
                    </NavLink>

                    <Routes>
                      <Route
                        to={`/detail/${movie.id}`}
                        element={<MovieDetail movie={movie} />}
                      />
                    </Routes>
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
        </div>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <div className={toggle ? "mainBgColor" : "secondaryBgColor"}>
          {!movies.length ? (
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
                        // onClick={() => playTrailer(movie)}
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

                    <Routes>
                      <Route
                        to={`/detail/${movie.id}`}
                        element={<MovieDetail movie={movie} />}
                      />
                    </Routes>
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
        </div>
      </Fragment>
    );
  }
}

export default Favourites;
