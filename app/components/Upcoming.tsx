/* eslint-disable jsx-a11y/alt-text */
"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useState } from "react";
import { MovieSummary } from "../type";
import axios from "axios";

export const Upcoming = () => {
  const [movies, setMovies] = useState<MovieSummary[]>([]);
  const API_KEY = "826f50ac875ac781d67fa627ccd5498a";
  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`)
      .then((res) => {
        setMovies(res.data.results);
      });
  }, []);

  const movie = movies[0];

  return (
    <div
      className="flex  w-460 justify-between items-center p-10 bg-cover bg-no-repeat"
      style={{
        backgroundImage: movie?.backdrop_path
          ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
          : undefined,
      }}
    >
      <div className="flex flex-col justify-start items-center gap-10 w-150 pl-20">
        {movie && (
          <>
            <div className="flex flex-col">
              <p className="text-white text-xl">Now Playing:</p>
              <p className="text-white text-4xl font-bold">
                {movie?.title || "Loading..."}
              </p>
              <div className="text-white text-2xl flex items-center gap-1">
                <img src={"star.svg"} alt="" className="h-10 w-10" />
                {movie.vote_average.toFixed(1)}/10
              </div>
            </div>
            <div className="">
              <p className="text-white ">{movie.overview}</p>
              <button className=" bg-white text-black px-4 py-2 mt-7 rounded flex items-center ">
                <img src={"play.svg"} className="mr-2" />
                Watch Trailer
              </button>
            </div>
          </>
        )}
      </div>
      <div className="h-150 flex items-center">
        <button className="w-10 h-10 bg-white rounded-full flex justify-center items-center">
          <img src={"arrow-right.svg"} alt="" />
        </button>
      </div>
    </div>
  );
};
