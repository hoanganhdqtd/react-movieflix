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

  const [currentPage, setCurrentPage] = useState(1);
  const [pageCounts, setPageCounts] = useState({
    total_pages: 500,
    total_results: 10000,
  });

  // const hasNext = pageCounts.total_pages > currentPage;

  const loadMoreItems = () => {
    // if (hasNext) {
    //   setCurrentPage((page) => page + 1);
    // }

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

  const handleInput = (searchTerm) => {
    setInputValue(searchTerm);
    setCurrentPage(1);
  };

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
          page: currentPage,
        },
      });
      console.log("movies", response);
      console.log(response.data.results);
      // setMovies(response.data.results);

      setMovies((prevResults) =>
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
        handleInput,
        handleScroll,
        currentPage,
        setCurrentPage,
        pageCounts,
        setPageCounts,
        getMovieTitle,
        getMovies,
        movies,
        setMovies,
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
