import "./App.css";

import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import MoviesList from "./components/MoviesList";
import Trending from "./components/Trending";
import Favourites from "./components/Favourites";
import MovieDetail from "./components/MovieDetail";

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
