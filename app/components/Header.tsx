/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { Genre } from "./Genre";
import { useEffect, useState } from "react";
import { MovieSummary } from "../type";
import axios from "axios";

export const Header = () => {
  const API_KEY = "d67d8bebd0f4ff345f6505c99e9d0289";
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MovieSummary[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);

    const timeout = setTimeout(() => {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`,
        )
        .then((res) => {
          setResults(res.data.results);
        })
        .finally(() => setLoading(false));
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className=" w-screen justify-center items-center flex ">
      <div className="flex h-14.75 w-375 justify-between items-center p-4">
        <Link className="flex gap-2 items-center" href={"/"}>
          <img src="film.svg" alt="" />
          <p className="text-indigo-500 font-bold text-[16px]">Movie Z</p>
        </Link>
        <div className="flex gap-2">
          <Genre />
          <div className="relative border h-9 border-stone-200 flex flex-row-reverse items-center p-3 rounded-lg shadow-3xl">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies..."
              className="w-94.75 outline-none"
            />
            {(results.length > 0 || loading) && (
              <button className="absolute top-8 bg-white mt-2 w-full shadow-lg rounded-lg max-h-60 overflow-y-auto z-20">
                {loading && <p className="p-3 text-gray-500">Searching...</p>}
                {results.slice(0, 5).map((movie) => (
                  <Link
                    key={movie.id}
                    href={`/movie/${movie.id}`}
                    className="p-2 flex items-center gap-2.5 hover:bg-gray-100 cursor-pointer"
                  >
                    {movie.poster_path && (
                      <img
                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                        alt={movie.title}
                        className="w-12 h-16 rounded shadow-md"
                      />
                    )}

                    <div className="space-y-1">
                      <p className="text-sm font-medium">{movie.title}</p>

                      <div className="flex items-center gap-1">
                        <img src={"star.svg"} alt="" className="h-3 w-3" />
                        <p className="text-yellow-500 text-xs">
                          {movie.vote_average.toFixed(1)}/10
                        </p>
                      </div>

                      <p className="text-xs text-gray-500 flex flex-start">
                        {movie.release_date}
                      </p>
                    </div>
                  </Link>
                ))}
              </button>
            )}
            <img
              src={"_magnifying-glass.svg"}
              alt=""
              className="w-6 h-6 pr-2"
            />
          </div>
        </div>
        <div>
          <button className=" border border-stone-200 w-9 h-9 rounded-lg flex justify-center items-center hover:scale-105 transition-transform cursor-pointer">
            <img src={"moon.svg"} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};
