/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { MovieSummary } from "../type";

const API_KEY = "826f50ac875ac781d67fa627ccd5498a";

export const Popular = () => {
  const [movies, setMovies] = useState<MovieSummary[]>([]);
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
      .then((res) => {
        setMovies(res.data.results);
      });
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between">
        <p className="text-4xl font-bold">Popular</p>
        <button
          onClick={() =>
            setVisibleCount((prev) => (prev > 10 ? 10 : prev + 10))
          }
          className="flex justify-center items-center gap-1.5 cursor-pointer hover:opacity-60"
        >
          {visibleCount > 10 ? "See less" : "See more"}
          <img src={"arrow-right.svg"} alt="" className="w-4 h-4" />
        </button>
      </div>
      <ul className="grid grid-cols-5 grid-rows-2 gap-4">
        {movies.slice(0, visibleCount).map((movie) => (
          <li
            key={movie.id}
            className="flex flex-col items-center w-75 hover:scale-105 transition-transform"
          >
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="rounded-t-lg shadow-md cursor-pointer"
              />
            )}

            <div className=" text-1xl font-normal pl-1.5 p-2 bg-stone-100 w-full h-fit rounded-b-lg">
              <div className="flex items-center gap-1">
                <img src={"star.svg"} alt="" className="h-4 w-4" />
                <p className="text-yellow-500 font-semibold">
                  {movie.vote_average.toFixed(1)}/10
                </p>
              </div>
              {movie.title}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
