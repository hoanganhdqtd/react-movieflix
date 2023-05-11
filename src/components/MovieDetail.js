import React from "react";
import { Fragment, useState } from "react";
import { MdOutlineFavorite } from "react-icons/md";
import { AiFillPlayCircle, AiOutlineClose } from "react-icons/ai";
import Trailers from "./Trailers";
import { useContext, useEffect } from "react";
import { MovieContext } from "../contexts/MovieContext";
import NoImage from "../NoImage.jpg";
// import { NavLink } from "react-router-dom";
import { TMDB_KEY, IMAGE_BASE_URL } from "../app/config";
import apiService from "../app/apiService";
import { Routes, Route, Navigate } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";

function MovieDetail() {
  const navigate = useNavigate();
  const { movieId } = useParams();

  const [trailer, setTrailer] = useState(true);
  const [movieTitle, setMovieTitle] = useState("");
  const [movieSearch, setMovieSearch] = useState([]);

  const [title, setTitle] = useState("");
  const [genres, setGenres] = useState([]);
  const [releaseDate, setReleaseDate] = useState("");
  const [posterPath, setPosterPath] = useState("");
  const [voteAverage, setVoteAverage] = useState("");
  const [voteCount, setVoteCount] = useState("");
  const [newMovieId, setNewMovieId] = useState("");
  const [movieOverview, setMovieOverview] = useState("");

  const { toggle, inputValue, setInputValue, addFavourite } =
    useContext(MovieContext);

  // const [movieData, setMovieData] = useState("");

  const playTrailer = (title) => {
    setMovieTitle(title);
    setTrailer(!trailer);
  };

  const getMovieGenres = (genresArr) => {
    let genres = [];
    for (let genre of genresArr) {
      genres.push(genre.name);
    }
    return genres.join(", ");
  };

  const getMovieSearch = async () => {
    const apiEndpoint = "search/movie";
    try {
      const response = await apiService.get(`${apiEndpoint}`, {
        params: {
          api_key: TMDB_KEY,
          query: inputValue,
        },
      });
      console.log("movies", response);
      console.log(response.data.results);
      setMovieSearch(response.data.results);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const getMovieDetail = async () => {
      try {
        const apiEndpoint = `movie/${movieId}`;
        console.log("apiEndpoint", apiEndpoint);
        const response = await apiService.get(`${apiEndpoint}`, {
          params: {
            api_key: TMDB_KEY,
          },
        });

        // response.data.title, response.data.genres,
        // response.data.release_date

        // setMovieData(response.data);
        setTitle(response.data.title);
        setGenres(getMovieGenres(response.data.genres));
        setReleaseDate(response.data.release_date);
        setPosterPath(response.data.poster_path);
        setVoteAverage(response.data.vote_average);
        setVoteCount(response.data.vote_count);
        setNewMovieId(response.data.id);
        setMovieOverview(response.data.overview);
        setInputValue("");
        return response.data;
      } catch (e) {
        console.log(e);
      }
    };

    getMovieDetail();
  }, [newMovieId]);

  const addFavouriteById = async (movieId) => {
    try {
      const apiEndpoint = `movie/${movieId}`;
      console.log("apiEndpoint", apiEndpoint);
      const response = await apiService.get(`${apiEndpoint}`, {
        params: {
          api_key: TMDB_KEY,
        },
      });

      addFavourite(response.data);

      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getMovieSearch();
  }, [inputValue]);

  const imgSrc = posterPath ? `${IMAGE_BASE_URL}${posterPath}` : NoImage;

  console.log("imgSrc", imgSrc);

  return inputValue ? (
    <Fragment>
      <div className={toggle ? "mainBgColor" : "secondaryBgColor"}>
        {!movieSearch.length ? (
          <h1 style={{ textAlign: "center" }}>No movies found.</h1>
        ) : (
          <div className="movies-container">
            {movieSearch.map((movie) => (
              <Fragment key={movie.id}>
                <div id={trailer ? "container" : "NoContainer"}>
                  <MdOutlineFavorite
                    id={trailer ? "likeIcon" : "hide"}
                    fontSize={30}
                    color="red"
                    onClick={() => addFavourite(movie)}
                  />
                  <AiFillPlayCircle
                    color="green"
                    fontSize={30}
                    id={trailer ? "playIcon" : "hide"}
                    onClick={() => playTrailer(title)}
                  />
                  <img
                    src={
                      movie.poster_path
                        ? `${IMAGE_BASE_URL}${movie.poster_path}`
                        : NoImage
                    }
                    alt={movie.title}
                    onClick={() => {
                      navigate(`/detail/${movie.id}`);
                      setNewMovieId(movie.id);
                    }}
                    // onClick={() => playTrailer(movie)}
                  />
                  <div id="movie-title">
                    <h3
                      className={toggle ? "DarkTheme" : "LightThemeClose"}
                      id={movie.title.length > 28 ? "smaller-Text" : ""}
                    >
                      {movie.title.length > 40
                        ? movie.title.slice(0, 40) + "..."
                        : movie.title}
                    </h3>
                  </div>
                </div>
                {/* <Routes>
                  <Route
                    element={<Navigate to=<MovieDetail movie={movie} /> />}
                  />
                </Routes> */}
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

            {/* <Routes>
              <Route
                to={`/detail/${movie.id}`}
                element={<MovieDetail movie={movie} />}
              />
            </Routes> */}
          </div>
        )}
      </div>
    </Fragment>
  ) : (
    <div className="movies-container-detail">
      <Fragment>
        <div id={trailer ? "container" : "NoContainer"}>
          <div style={{ textAlign: "center", position: "relative" }}>
            <img
              src={imgSrc}
              alt={title}
              // onClick={() => playTrailer(movie)}
            />
            <MdOutlineFavorite
              id={trailer ? "likeIcon-detail" : "hide"}
              fontSize={30}
              color="red"
              onClick={() => addFavouriteById(movieId)}
            />
            <AiFillPlayCircle
              color="green"
              fontSize={30}
              id={trailer ? "playIcon-detail" : "hide"}
              onClick={() => playTrailer(title)}
            />
          </div>

          <div id="movie-title">
            <h3
              className={toggle ? "DarkTheme" : "LightThemeClose"}
              // id={title.length > 28 ? "smaller-Text" : ""}
            >
              {title.length > 40 ? title.slice(0, 40) + "..." : title}
            </h3>

            <h4
              className={toggle ? "DarkTheme" : "LightThemeClose"}
              // id={title.length > 28 ? "smaller-Text" : ""}
            >
              <span id="movie-tag">Genres:</span>{" "}
              <span id="movie-description">{genres}</span>
            </h4>
            <h4
              className={toggle ? "DarkTheme" : "LightThemeClose"}
              // id={getMovieTitle(movie).length > 28 ? "smaller-Text" : ""}
            >
              <span id="movie-tag">Release date:</span>{" "}
              <span id="movie-description">{releaseDate}</span>
            </h4>
            <h4
              className={toggle ? "DarkTheme" : "LightThemeClose"}
              // id={getMovieTitle(movie).length > 28 ? "smaller-Text" : ""}
            >
              <span id="movie-tag">Vote average:</span>{" "}
              <span id="movie-description">{voteAverage}</span>
            </h4>
            <h4
              className={toggle ? "DarkTheme" : "LightThemeClose"}
              // id={getMovieTitle(movie).length > 28 ? "smaller-Text" : ""}
            >
              <span id="movie-tag">Vote count:</span>{" "}
              <span id="movie-description">{voteCount}</span>
            </h4>
            <h4
              className={toggle ? "DarkTheme" : "LightThemeClose"}
              // id={getMovieTitle(movie).length > 28 ? "smaller-Text" : ""}
            >
              <span id="movie-tag">Overview:</span>{" "}
              <span id="movie-description">{movieOverview}</span>
            </h4>
          </div>
        </div>
        {!trailer && <Trailers movieTitle={title} toggle={toggle} />}
        <AiOutlineClose
          id={trailer ? "Nothing" : "Exit1"}
          className={toggle ? "DarkTheme" : "LightThemeClose"}
          fontSize={50}
          color={toggle ? "#fff" : "#ff206e"}
          cursor={"pointer"}
          onClick={() => setTrailer(true)}
        />
      </Fragment>

      {/* <Routes>
        <Route
          to={`/detail/${movieId}`}
          element={<MovieDetail movie={movie} />}
        />
      </Routes> */}
      <Routes>
        <Route to={`/detail/${newMovieId}`} element={<MovieDetail />} />
      </Routes>
    </div>
  );
}

export default MovieDetail;
