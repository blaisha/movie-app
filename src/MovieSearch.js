import React, { useState } from "react";
import Movies from "./Movies";
import axios from "axios";

export default function MovieSearch({ defaultMovie }) {
  const [movieName, setMovieName] = useState(defaultMovie);
  const [movieData, setMovieData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  function handleResponse(response) {
    setMovieData(response.data.Search);
    setLoaded(true);
  }

  function searchMovies() {
    const apiKey = `c032e2d7`;
    let apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${movieName}`;
    axios.get(apiUrl).then(handleResponse);
  }

  function handleSubmit(event) {
    event.preventDefault();
    searchMovies(movieName);
  }

  function updateMovieName(event) {
    setMovieName(event.target.value);
  }

  if (loaded) {
    return (
      <div className="Search">
        <h1>Movie Finder</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Enter a movie"
            autoFocus="off"
            autoComplete="off"
            onChange={updateMovieName}
          />
        </form>
        <Movies data={movieData} />
      </div>
    );
  } else {
    searchMovies();

    return (
      <div>
        <div>LOADING..</div>
      </div>
    );
  }
}
