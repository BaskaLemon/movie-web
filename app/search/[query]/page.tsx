"use client";

import { Footer } from "@/app/components/Footer";
import { Header } from "@/app/components/Header";
import { MovieCardSkeleton } from "@/app/components/Skeleton";
import { MovieSummary } from "@/app/type";
import axios from "axios";
import Link from "next/link";
import { use, useEffect, useState } from "react";

type Props = {
  params: Promise<{
    query: string;
  }>;
};

export default function SearchPage({ params }: Props) {
  const API_KEY = "d67d8bebd0f4ff345f6505c99e9d0289";

  const { query } = use(params);

  const [results, setResults] = useState<MovieSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const decodedQuery = decodeURIComponent(query);

  useEffect(() => {
    if (!decodedQuery.trim()) {
      setResults([]);
      return;
    }

    const controller = new AbortController();

    const timeout = setTimeout(async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          "https://api.themoviedb.org/3/search/movie",
          {
            params: {
              api_key: API_KEY,
              query: decodedQuery,
              page,
            },
            signal: controller.signal,
          },
        );

        setResults(res.data.results);
        const total = Math.min(res.data.total_pages || 1, 500);
        setTotalPages(total);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [decodedQuery, page]);
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
    <div className="flex flex-col justify-center items-center gap-20 dark:bg-black dark:text-white ">
      <Header />
      <div>
        <div className="flex justify-between mb-8">
          <p className="text-4xl font-bold">
            Search results for: {decodedQuery}
          </p>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-4 w-fit items-center justify-center">
          {loading ? (
            <MovieCardSkeleton count={12} />
          ) : (
            results.map((movie) => (
              <Link
                key={movie.id}
                href={`/movie/${movie.id}`}
                className="flex flex-col items-center w-75 hover:scale-105 transition-transform"
              >
                {movie.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded-t-lg shadow-md cursor-pointer"
                  />
                )}

                <div className=" text-1xl font-normal pl-1.5 p-2 bg-stone-100 w-full h-fit rounded-b-lg dark:bg-gray-700">
                  <div className="flex items-center gap-1">
                    <img src="/star.svg" alt="" className="h-4 w-4" />
                    <p className="text-yellow-500 font-semibold">
                      {movie.vote_average.toFixed(1)}/10
                    </p>
                  </div>
                  {movie.title}
                </div>
              </Link>
            ))
          )}
        </ul>
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
      <Footer />
    </div>
  );
}
