import React, { Fragment, useContext } from "react";
import { HiSearch } from "react-icons/hi";
// import { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
// import MoviesList from "./MoviesList";
// import Trending from "./Trending";
// import Favourites from "./Favourites";
// import MovieDetail from "./MovieDetail";
// import { favouriteList } from "./AddFavourites";
import { MovieContext } from "../contexts/MovieContext";

function NavBar() {
  // const [toggle, setToggle] = useState(true);
  // const [inputValue, setInputValue] = useState("");

  const { setInputValue, toggle } = useContext(MovieContext);

  // const favouriteList = [];

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <Fragment>
      <nav id={toggle ? "" : "navBarColor"}>
        <div className="nav-options">
          <NavLink to="/">
            <h1 id={toggle ? "" : "heading"}>MovieFlix</h1>
          </NavLink>
          <NavLink
            to="/"
            // style={({ isActive }) => {
            //   return isActive ? { color: "#ee9b00" } : { color: "#fff" };
            // }}
            className={({ isActive }) => {
              return isActive ? "active-link" : "";
            }}
          >
            <span>Movies</span>
          </NavLink>
          <NavLink
            to="/trending"
            // style={({ isActive }) => {
            //   return isActive ? { color: "#ee9b00" } : { color: "#fff" };
            // }}
            className={({ isActive }) => {
              return isActive ? "active-link" : "";
            }}
          >
            <span>Trending</span>
          </NavLink>
          <NavLink
            to="/favourites"
            // style={({ isActive }) => {
            //   return isActive ? { color: "#ee9b00" } : { color: "#fff" };
            // }}
            className={({ isActive }) => {
              return isActive ? "active-link" : "";
            }}
          >
            <span>Favourites</span>
          </NavLink>
        </div>
        <div className="input-group">
          <input type="text" placeholder="Search" onChange={handleInput} />
          <HiSearch fontSize={21} id="search" />
          {/* <div id="Color-switcher" onClick={() => setToggle(!toggle)}>
              <div
                id={toggle ? "Color-switcher-mover" : "Color-switcher-moved"}
              ></div>
            </div> */}
        </div>
      </nav>
      {/* <Routes>
        <Route path="/" element={<MoviesList />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/detail/*" element={<MovieDetail />} />
      </Routes> */}
    </Fragment>
  );
}

export default NavBar;
