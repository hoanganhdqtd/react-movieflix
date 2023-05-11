import React, { Fragment } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { IMAGE_BASE_URL } from "../app/config";
import { AiFillPlayCircle, AiOutlineClose } from "react-icons/ai";
import { MdOutlineFavorite } from "react-icons/md";
import NoImage from "../NoImage.jpg";
import Trailers from "./Trailers";
import { MovieContext } from "../contexts/MovieContext";
import { NavLink } from "react-router-dom";
import Grid from "@mui/material/Grid";

function MoviesList() {
  const {
    addFavourite,
    inputValue,
    currentPage,
    handleScroll,
    getMovieTitle,
    getMovies,
    movies,
    setMovies,
    playTrailer,
    movieTitle,
    trailer,
    setTrailer,
    isLoading,
    setIsLoading,
    toggle,
  } = useContext(MovieContext);

  // const [toggle, setToggle] = useState(true);
  // const [movies, setMovies] = useState([]);
  // const [trailer, setTrailer] = useState(true);
  // const [movieTitle, setMovieTitle] = useState("");

  useEffect(() => {
    getMovies();
  }, [inputValue, currentPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // cleanup function
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Fragment>
      <div className={toggle ? "mainBgColor" : "secondaryBgColor"}>
        {isLoading && currentPage === 1 ? (
          <h1 style={{ textAlign: "center" }}>Loading...</h1>
        ) : !movies.length ? (
          <h1 style={{ textAlign: "center" }}>No results</h1>
        ) : (
          <Grid container spacing={2} mt={1}>
            {movies.map((movie) => (
              <Grid key={movie.id} item xs={6} md={4} lg={4}>
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
                      style={{
                        width: "100%",
                        borderRadius: "18px",
                      }}
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
              </Grid>
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
          </Grid>
        )}
      </div>
    </Fragment>
  );
}

export default MoviesList;
