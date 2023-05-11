import React, { Fragment, useContext } from "react";
import { HiSearch } from "react-icons/hi";
// import { useState } from "react";
// import { Routes, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useRef } from "react";

import { MovieContext } from "../contexts/MovieContext";

function NavBar() {
  // const [toggle, setToggle] = useState(true);

  const { inputValue, handleInput, toggle } = useContext(MovieContext);

  const navRef = useRef();

  const showNavBar = () => {
    console.log("navRef.current", navRef.current);
    navRef.current.classList.toggle("responsive-nav");
  };

  return (
    <Fragment>
      <header id={toggle ? "" : "navBarColor"}>
        <NavLink to="/">
          <h1 id={toggle ? "" : "heading"}>MovieFlix</h1>
        </NavLink>
        <nav id="nav-options" ref={navRef}>
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

          <button className="nav-btn nav-close-btn" onClick={showNavBar}>
            <FaTimes />
          </button>
        </nav>

        <button className="nav-btn" onClick={showNavBar}>
          <FaBars />
        </button>

        <div className="input-group">
          <input
            type="text"
            placeholder="Search"
            // onChange={handleInput}
            onChange={(e) => handleInput(e.target.value)}
            value={inputValue}
          />
          {/* <HiSearch fontSize={21} id="search" /> */}
          {/* <div id="Color-switcher" onClick={() => setToggle(!toggle)}>
              <div
                id={toggle ? "Color-switcher-mover" : "Color-switcher-moved"}
              ></div>
            </div> */}
        </div>
      </header>
    </Fragment>
  );
}

export default NavBar;
