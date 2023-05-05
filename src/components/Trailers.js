import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import ReactPlayer from "react-player";
import movieTrailer from "movie-trailer";

function Trailers({ movieTitle, toggle }) {
  const [video, setVideo] = useState(movieTitle);
  const [videoURL, setVideoURL] = useState("");
  function handleSearch() {
    movieTrailer(video).then((res) => {
      setVideoURL(res);
    });
  }

  useEffect(() => {
    handleSearch();
  }, [videoURL]);

  return (
    <Fragment>
      {/* <div className="Container"></div> */}
      <div className="player">
        {/* <h1 id={toggle ? "TrailerMovie-name-dark" : "TrailerMovie-name-light"}>
          {movieTitle}
        </h1> */}
        <ReactPlayer url={videoURL} controls={true} muted={false}></ReactPlayer>
      </div>
    </Fragment>
  );
}

export default Trailers;
