/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { MovieSummary } from "@/app/type";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const genres = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Film-Noir",
  "Game-Show",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "News",
  "Reality-TV",
  "Romance",
  "Sci-Fi",
  "Short",
  "Sport",
  "Talk-Show",
  "Thriller",
  "War",
  "Western",
];

// helpers
const toSlug = (g: string) => g.toLowerCase().replace(/\s+/g, "-");

export default function GenrePage() {
  const { slug } = useParams();
  const router = useRouter();

  const [movies, setMovies] = useState<MovieSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [genreMap, setGenreMap] = useState<Record<string, number>>({});

  const formatGenre = (text: string) =>
    text
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  // ✅ Initialize selected genres safely
  useEffect(() => {
    if (!slug) return;

    const parts = Array.isArray(slug) ? slug : (slug as string).split(",");

    setSelectedGenres(parts.filter(Boolean));
  }, [slug]);

  // ✅ Fetch genre list ONCE and cache
  useEffect(() => {
    if (!API_KEY) return;

    axios
      .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
      .then((res) => {
        const map: Record<string, number> = {};
        res.data.genres.forEach((g: { id: number; name: string }) => {
          map[toSlug(g.name)] = g.id;
        });
        setGenreMap(map);
      });
  }, []);

  // ✅ Fetch movies when genres change
  useEffect(() => {
    if (!selectedGenres.length || !Object.keys(genreMap).length) return;

    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        setLoading(true);

        const ids = selectedGenres.map((g) => genreMap[g]).filter(Boolean);

        if (!ids.length) {
          setMovies([]);
          return;
        }

        const res = await axios.get(
          `https://api.themoviedb.org/3/discover/movie`,
          {
            params: {
              api_key: API_KEY,
              with_genres: ids.join(","),
            },
            signal: controller.signal,
          },
        );

        setMovies(res.data.results || []);
      } catch (err: any) {
        if (err.name !== "CanceledError") {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();

    return () => controller.abort();
  }, [selectedGenres, genreMap]);

  const toggleGenre = (g: string) => {
    const gSlug = toSlug(g);

    let updated: string[];

    if (selectedGenres.includes(gSlug)) {
      updated = selectedGenres.filter((x) => x !== gSlug);
    } else {
      updated = [...selectedGenres, gSlug];
    }

    setSelectedGenres(updated);

    // ✅ Better UX (no history spam)
    router.replace(`/genre/${updated.join(",")}`);
  };

  return (
    <div className="flex flex-col items-center">
      <Header />

      <div className="flex w-full max-w-7xl gap-8 p-6">
        {/* SIDEBAR */}
        <div className="w-64 border-r pr-4">
          <h2 className="text-lg font-semibold mb-2">Genres</h2>

          <div className="flex flex-wrap gap-2">
            {genres.map((g) => {
              const gSlug = toSlug(g);
              const active = selectedGenres.includes(gSlug);

              return (
                <button
                  key={g}
                  onClick={() => toggleGenre(g)}
                  className={`border px-3 py-1 text-xs rounded-full transition ${
                    active ? "bg-black text-white" : ""
                  }`}
                >
                  {g}
                </button>
              );
            })}
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1">
          <h1 className="text-xl font-semibold mb-6">
            {movies.length} titles in{" "}
            {selectedGenres.map(formatGenre).join(", ") || "All"}
          </h1>

          {loading ? (
            <p>Loading...</p>
          ) : movies.length === 0 ? (
            <p>No movies found for selected genres.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {movies.map((movie) => (
                <Link key={movie.id} href={`/movie/${movie.id}`}>
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      className="rounded-md"
                    />
                  ) : (
                    <div className="w-full h-60 bg-gray-300 rounded-md" />
                  )}
                  <p className="text-sm mt-2">{movie.title}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
