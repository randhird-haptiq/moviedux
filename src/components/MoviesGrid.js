import React, { useState, useEffect } from "react";

import "../styles.css";
import MovieCard from "./MovieCard";

export default function MoviesGrid() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState("All Genres");
  const [rating, setRating] = useState("All Ratings");

  useEffect(() => {
    fetch("movies.json")
      .then((response) => response.json())
      .then((data) => setMovies(data));
  }, []);

  const uniqueGenres = [
    "All Genres",
    ...new Set(movies.map((movie) => movie.genre)),
  ];
  const uniqueRatings = [
    "All Ratings",
    ...new Set(movies.map((movie) => movie.rating)),
  ];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const filteredMovies = movies.filter((movie) => {
    const matchesGenre =
      genre === "All Genres" ||
      movie.genre.toLowerCase() === genre.toLowerCase();
  
    const matchesRating = (() => {
      switch (rating) {
        case "All Ratings":
          return true;
        case "Good":
          return movie.rating >= 8;
        case "Ok":
          return movie.rating >= 5 && movie.rating < 8;
        case "Bad":
          return movie.rating < 5;
        default:
          return false;
      }
    })();
  
    const matchesSearchTerm = movie.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  
    return matchesGenre && matchesRating && matchesSearchTerm;
  });
  

  return (
    <div>
      <input
        className="search-input"
        type="text"
        placeholder="Search movies...."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <div className="filter-bar">
        <div className="filter-slot">
          <label htmlFor="">Genre</label>
          <select value={genre} onChange={handleGenreChange}>
            {uniqueGenres.map((genreOption) => (
              <option key={genreOption} value={genreOption}>
                {genreOption}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-slot">
          <label htmlFor="">Rating</label>
          <select value={rating} onChange={handleRatingChange}>
            {/* {uniqueRatings.map((ratingOption) => (
              <option key={ratingOption} value={ratingOption}>
                {ratingOption}
              </option>
            ))} */}
            <option value="All Ratings">All Ratings</option>
            <option value="Good">Good</option>
            <option value="Ok">Ok</option>
            <option value="Bad">Bad</option>
          </select>
        </div>
      </div>

      <div className="movies-grid">
        {filteredMovies.map((movie) => (
          <MovieCard movie={movie} key={movie.id}></MovieCard>
        ))}
      </div>
    </div>
  );
}
