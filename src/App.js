import { useState } from "react";
import "./App.css";
// import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import MoviesList from "./components/MoviesList";
import Trending from "./components/Trending";
import Favourites from "./components/Favourites";
import MovieDetail from "./components/MovieDetail";

// function App() {
//   // const [favouriteList, setFavouriteList] = useState([]);
//   const [favouriteList, setFavouriteList] = useState(
//     localStorage.getItem("favouriteMovies")
//       ? JSON.parse(localStorage.getItem("favouriteMovies"))
//       : []
//   );
//   console.log("favouriteList", favouriteList);
//   const addToFavourites = (movie, favouriteList) => {
//     // const newFavouriteList = [...favouriteList, movie];
//     // setFavouriteList(newFavouriteList);
//     // saveLocalStorage(newFavouriteList);
//     if (!favouriteList.some((addedMovie) => addedMovie.id === movie.id)) {
//       const newFavouriteList = [...favouriteList, movie];
//       setFavouriteList(newFavouriteList);
//       saveLocalStorage(newFavouriteList);
//     }
//   };
//   const removeFavourites = (movie, favouriteList) => {
//     const newFavouriteList = favouriteList.filter(
//       (favouriteMovie) => favouriteMovie.id !== movie.id
//     );
//     setFavouriteList(newFavouriteList);
//     saveLocalStorage(newFavouriteList);
//   };
//   const saveLocalStorage = (favouriteMovies) => {
//     localStorage.setItem("favouriteMovies", JSON.stringify(favouriteMovies));
//   };
//   return (
//     <div className="App">
//       <NavBar
//         favouriteList={favouriteList}
//         addToFavourites={addToFavourites}
//         removeFavourites={removeFavourites}
//       />
//     </div>
//   );
// }

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<MoviesList />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/detail/:movieId" element={<MovieDetail />} />
        {/* <Route path="/favourites/detail/:movieId" element={<MovieDetail />} />
        <Route path="/trending/detail/:movieId" element={<MovieDetail />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
