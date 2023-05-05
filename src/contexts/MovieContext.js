import { createContext, useState } from "react";
import apiService from "../app/apiService";
import { TMDB_KEY } from "../app/config";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [favouriteList, setFavouriteList] = useState(
    JSON.parse(localStorage.getItem("favouriteMovies")) || []
  );
  const [toggle, setToggle] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [movies, setMovies] = useState([]);
  const [trailer, setTrailer] = useState(true);
  const [movieTitle, setMovieTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // const handleInput = (e) => {
  //   setInputValue(e.target.value);
  // };

  const addFavourite = (movie) => {
    if (
      !favouriteList.some((favouriteMovie) => favouriteMovie.id === movie.id)
    ) {
      const newFavouriteList = [...favouriteList, movie];
      setFavouriteList(newFavouriteList);
      saveToLocalStorage(newFavouriteList);
    }
  };

  const removeFavourite = (movie) => {
    const newFavouriteList = favouriteList.filter(
      (favouriteMovie) => favouriteMovie.id !== movie.id
    );
    setFavouriteList(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const saveToLocalStorage = (favouriteMovies) => {
    localStorage.setItem("favouriteMovies", JSON.stringify(favouriteMovies));
  };

  const getMovieTitle = (movie) => {
    return movie.title ? movie.title : movie.name;
  };

  const getMovies = async () => {
    const apiEndpoint = inputValue ? "search/movie" : "discover/movie";
    setIsLoading(true);
    try {
      const response = await apiService.get(`${apiEndpoint}`, {
        params: {
          api_key: TMDB_KEY,
          query: inputValue,
        },
      });
      console.log("movies", response);
      console.log(response.data.results);
      setMovies(response.data.results);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  const playTrailer = (movie) => {
    // if (movie.title) {
    //   setMovieTitle(movie.title);
    // } else {
    //   setMovieTitle(movie.name);
    // }
    setMovieTitle(getMovieTitle(movie));
    setTrailer(!trailer);
  };

  return (
    <MovieContext.Provider
      value={{
        favouriteList,
        setFavouriteList,
        addFavourite,
        removeFavourite,
        toggle,
        inputValue,
        setInputValue,
        getMovieTitle,
        getMovies,
        movies,
        playTrailer,
        movieTitle,
        setMovieTitle,
        trailer,
        setTrailer,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
