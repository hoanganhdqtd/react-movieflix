import React, { Fragment, useEffect, useState } from "react";
import { AiFillPlayCircle, AiOutlineClose } from "react-icons/ai";
import { MdOutlineFavorite, MdOutlineRemoveCircle } from "react-icons/md";
import { Grid } from "@mui/material";
import Trailers from "./Trailers";
import NoImage from "../NoImage.jpg";
import { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";
import { IMAGE_BASE_URL } from "../app/config";
import { NavLink, Routes, Route } from "react-router-dom";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

function Favourites() {
  const {
    inputValue,
    favouriteList,
    addFavourite,
    removeFavourite,
    movies,
    getMovies,
    currentPage,
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

  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  // useEffect(() => {
  //   getMovies();
  // }, [inputValue]);

  useEffect(() => {
    getMovies();
  }, [inputValue, currentPage]);

  if (!inputValue) {
    return (
      <Fragment>
        <div className={toggle ? "mainBgColor" : "secondaryBgColor"}>
          {!favouriteList.length ? (
            <h1 style={{ textAlign: "center" }}>
              No movies added yet. Please pick some.
            </h1>
          ) : (
            <Grid container spacing={2} mt={1}>
              {favouriteList.map((movie) => (
                <Grid key={movie.id} item xs={6} md={4} lg={4}>
                  <div id={trailer ? "container" : "NoContainer"}>
                    <MdOutlineRemoveCircle
                      id={trailer ? "likeIcon" : "hide"}
                      fontSize={40}
                      color="red"
                      onClick={() => removeFavourite(movie)}
                      onMouseEnter={handlePopoverOpen}
                      onMouseLeave={handlePopoverClose}
                    >
                      <Popover
                        id="mouse-over-popover"
                        sx={{
                          pointerEvents: "none",
                        }}
                        open={open}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                        onClose={handlePopoverClose}
                        disableRestoreFocus
                      >
                        <Typography sx={{ p: 1 }}>
                          Remove from favourites
                        </Typography>
                      </Popover>
                    </MdOutlineRemoveCircle>
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
                        style={{ width: "100%", borderRadius: "18px" }}
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

                    {/* <Routes>
                      <Route
                        to={`/detail/${movie.id}`}
                        element={<MovieDetail movie={movie} />}
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
  } else {
    return (
      <Fragment>
        <div className={toggle ? "mainBgColor" : "secondaryBgColor"}>
          {!movies.length ? (
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

                    <NavLink to={{ pathname: `/detail/${movie.id}` }}>
                      <img
                        style={{ width: "100%", borderRadius: "18px" }}
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

                    {/* <Routes>
                      <Route
                        to={`/detail/${movie.id}`}
                        element={<MovieDetail movie={movie} />}
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
}

export default Favourites;
