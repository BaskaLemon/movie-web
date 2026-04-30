/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { Footer } from "@/app/components/Footer";
import { Header } from "@/app/components/Header";
import { Genre, MovieSummary } from "@/app/type";
import { tmdb } from "@/lib/tmdb";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function GenrePage() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [movies, setMovies] = useState<MovieSummary[]>([]);
  const [selectedGenre, setSelectedGenres] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    tmdb.get("/genre/movie/list").then((res) => {
      setGenres(res.data.genres);
    });
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const url =
          selectedGenre.length > 0 ? "/discover/movie" : "/trending/movie/week";

        const safePage = Math.min(page, 500);

        const params: any = { page: safePage };

        if (selectedGenre.length > 0) {
          params.with_genres = selectedGenre.join(",");
        }

        const res = await tmdb.get(url, { params });

        setMovies(res.data.results);
        setTotalPages(res.data.total_pages || 1);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMovies();
  }, [selectedGenre, page]);
  const handleGenreClick = (id: number) => {
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id],
    );
    setPage(1);
  };
  const getPagination = (current: number, total: number) => {
    const pages: (number | "...")[] = [];

    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    if (current <= 3) {
      pages.push(1, 2, 3, "...", total);
    } else if (current >= total - 2) {
      pages.push(1, "...", total - 2, total - 1, total);
    } else {
      pages.push(1, "...", current - 1, current, current + 1, "...", total);
    }

    return pages;
  };
  const maxPages = Math.min(totalPages, 500);
  const pages = getPagination(page, maxPages);
  return (
    <div className="justify-center w-screen dark:bg-black dark:text-white ">
      <Header />

      <div className="w-full space-y-8 justify-start mx-50 my-20">
        <p className="font-bold text-4xl">Search filter</p>

        <div className="flex h-fit ">
          <div className="border-r-2 border-stone-100 w-[20%] space-y-5 pr-4 dark:border-gray-700">
            <div>
              <p className="font-semibold text-2xl">Genres</p>
              <p>See lists of movies by genre</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => handleGenreClick(genre.id)}
                  className={`border cursor-pointer hover:scale-105 transition-transform duration-300 text-xs font-semibold py-1 px-3 rounded-full flex items-center gap-2 dark:border-gray-700
                ${
                  selectedGenre.includes(genre.id)
                    ? "bg-black text-white dark:bg-gray-700"
                    : "border-[#E4E4E7]"
                }`}
                >
                  {genre.name}
                </button>
              ))}
            </div>
            <button
              onClick={() => setSelectedGenres([])}
              className="flex justify-center items-center text-sm  bg-stone-300 p-2 rounded-2xl cursor-pointer hover:scale-105 transition-transform dark:bg-gray-700"
            >
              Clear filters
            </button>
          </div>
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 ml-10">
              {movies.slice(0, 12).map((movie) => (
                <Link
                  key={movie.id}
                  href={`/movie/${movie.id}`}
                  className="flex flex-col items-center w-60 hover:scale-105 transition-transform"
                >
                  {movie.poster_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                      alt={movie.title}
                      className="rounded-t-lg shadow-md"
                    />
                  )}

                  <div className="text-lg font-normal p-2 bg-stone-100 w-full rounded-b-lg dark:bg-gray-700">
                    <div className="flex items-center gap-1">
                      <img src="/star.svg" alt="" className="h-4 w-4" />
                      <p className="text-yellow-500 font-semibold">
                        {movie.vote_average.toFixed(1)}/10
                      </p>
                    </div>
                    {movie.title}
                  </div>
                </Link>
              ))}
            </div>
            <div className="w-full flex items-center justify-center gap-2 mt-10 mb-10">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="flex justify-center items-center text-sm  bg-stone-300 p-2 rounded-2xl cursor-pointer hover:scale-105 transition-transform disabled:opacity-40 dark:bg-gray-700"
              >
                ← Previous
              </button>
              {pages.map((p, i) =>
                p === "..." ? (
                  <span key={i} className="px-2">
                    ...
                  </span>
                ) : (
                  <button
                    key={i}
                    onClick={() => setPage(p)}
                    className={`px-4 py-2 rounded-xl border transition ${
                      page === p
                        ? "bg-gray-200 border-gray-300 shadow-sm font-semibold dark:bg-gray-700 dark:border-gray-700"
                        : "hover:bg-gray-100 hover:dark:bg-gray-700"
                    }`}
                  >
                    {p}
                  </button>
                ),
              )}
              <button
                disabled={page === maxPages}
                onClick={() => setPage((p) => p + 1)}
                className="flex justify-center items-center text-sm  bg-stone-300 p-2 rounded-2xl cursor-pointer hover:scale-105 transition-transform disabled:opacity-40 dark:bg-gray-700"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
