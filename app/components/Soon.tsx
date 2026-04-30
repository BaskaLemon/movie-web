/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { MovieSummary } from "../type";
import Link from "next/link";
import { useTheme } from "./ThemeContext";

const API_KEY = "826f50ac875ac781d67fa627ccd5498a";

export const Soon = () => {
  const [movies, setMovies] = useState<MovieSummary[]>([]);
  const { dark } = useTheme();

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`,
      )
      .then((res) => {
        setMovies(res.data.results);
      });
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between">
        <p className="text-4xl font-bold">Upcoming</p>
        <Link
          href={"/upcoming"}
          className="flex justify-center items-center gap-1.5 cursor-pointer hover:opacity-60"
        >
          See more
          {dark ? (
            <img src="arrow-right (1).svg" alt="" className="w-4 h-4" />
          ) : (
            <img src={"arrow-right.svg"} alt="" className="w-4 h-4" />
          )}
        </Link>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {movies.slice(0, 10).map((movie) => (
          <Link
            key={movie.id}
            href={`/movie/${movie.id}`}
            className="flex flex-col items-center w-75 hover:scale-105 transition-transform"
          >
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
                className="rounded-t-lg shadow-md cursor-pointer"
              />
            )}

            <div className=" text-1xl font-normal pl-1.5 p-2 bg-stone-100 w-full h-fit rounded-b-lg dark:bg-gray-700">
              <div className="flex items-center gap-1">
                <img src={"star.svg"} alt="" className="h-4 w-4" />
                <p className="text-yellow-500 font-semibold">
                  {movie.vote_average.toFixed(1)}/10
                </p>
              </div>
              {movie.title}
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};
