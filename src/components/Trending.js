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
import { Grid } from "@mui/material";
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

  const [currentPage, setCurrentPage] = useState(1);
  const [pageCounts, setPageCounts] = useState({
    total_pages: 1000,
    total_results: 20000,
  });

  const loadMoreItems = () => {
    // just set the page, the effect will respond to it

    if (pageCounts.total_pages > currentPage) {
      setCurrentPage((page) => page + 1);
    }
  };

  const handleScroll = () => {
    console.log("inside handleScroll");
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight - 1) {
      loadMoreItems();
    }
  };

  console.log("inputValue", inputValue);
  const apiEndpoint = inputValue ? "search/movie" : "trending/all/day";

  const getTrending = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.get(`${apiEndpoint}`, {
        params: {
          api_key: TMDB_KEY,
          query: inputValue,
          page: currentPage,
        },
      });

      // setTrendingMovies(response.data.results);
      setTrendingMovies((prevResults) =>
        currentPage === 1
          ? response.data.results
          : [...prevResults, ...response.data.results]
      );

      const { total_pages, total_results } = response.data;
      setPageCounts({
        total_pages,
        total_results,
      });
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getTrending();
  }, [inputValue, currentPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // cleanup function
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const playTrendingTrailer = (movie) => {
    setTrendingTitle(getMovieTitle(movie));
    setTrailer(!trailer);
  };

  return (
    <Fragment>
      <div className={toggle ? "mainBgColor" : "secondaryBgColor"}>
        {isLoading && currentPage === 1 ? (
          <h1 style={{ textAlign: "center" }}>Loading...</h1>
        ) : !trendingMovies.length ? (
          <h1 style={{ textAlign: "center" }}>No results</h1>
        ) : (
          <Grid container spacing={2} mt={1}>
            {trendingMovies.map((movie) => (
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
                    onClick={() => playTrendingTrailer(movie)}
                  />
                  <NavLink
                    to={{ pathname: `/detail/${movie.id}` }}
                    // style={{ textDecoration: "none !important" }}
                  >
                    <img
                      style={{ width: "100%", borderRadius: "18px" }}
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
              </Grid>
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
          </Grid>
        )}
      </div>
    </Fragment>
  );
}

export default Trending;
