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
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
// import { useNavigation } from "@react-navigation/native";
// import MovieDetail from "./MovieDetail";

import apiService from "../app/apiService";
import { TMDB_KEY } from "../app/config";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

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

  console.log("inputValue", inputValue);

  useEffect(() => {
    getMovies();
  }, [inputValue, currentPage]);

  // const loadMoreItems = () => {
  //   // just set the page, the effect will respond to it
  //   console.log("loadMoreItems");
  //   console.log("pageCounts.total_pages", pageCounts.total_pages);
  //   console.log("currentPage", currentPage);
  //   if (pageCounts.total_pages > currentPage) {
  //     setCurrentPage((page) => page + 1);
  //   }
  // };

  // const handleScroll = () => {
  //   const windowHeight =
  //     "innerHeight" in window
  //       ? window.innerHeight
  //       : document.documentElement.offsetHeight;
  //   const body = document.body;
  //   const html = document.documentElement;
  //   const docHeight = Math.max(
  //     body.scrollHeight,
  //     body.offsetHeight,
  //     html.clientHeight,
  //     html.scrollHeight,
  //     html.offsetHeight
  //   );
  //   const windowBottom = windowHeight + window.pageYOffset;
  //   console.log("handleScroll");
  //   console.log("windowBottom", windowBottom);
  //   console.log("docHeight", docHeight);
  //   if (windowBottom >= docHeight - 1) {
  //     loadMoreItems();
  //   }
  // };

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
