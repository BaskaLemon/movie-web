/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { MovieSummary } from "@/app/type";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Header } from "@/app/components/Header";
import axios from "axios";
import { Footer } from "@/app/components/Footer";
import Link from "next/link";

const API_KEY = "d67d8bebd0f4ff345f6505c99e9d0289";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [credits, setCredits] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<MovieSummary[]>([]);
  const director = credits?.crew?.find(
    (person: any) => person.job === "Director",
  );
  const writers = credits?.crew?.filter(
    (person: any) => person.job === "Writer" || person.job === "Screenplay",
  );

  const cast = credits?.cast?.slice(0, 3);
  useEffect(() => {
    if (!id) return;

    setLoading(true);

    Promise.all([
      axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`),
      axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`,
      ),
      axios.get(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}`,
      ),
    ])
      .then(([movieRes, creditsRes, recRes]) => {
        setMovie(movieRes.data);
        setCredits(creditsRes.data);
        setRecommendations(recRes.data.results);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4 dark:bg-black dark:text-white">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
        <p className="text-gray-500 text-sm">Loading movie details...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center gap-4  dark:bg-black dark:text-white">
        <div className="text-5xl">🎬</div>
        <h2 className="text-2xl font-semibold">Movie not found</h2>
        <p className="text-gray-500 text-sm max-w-sm">
          The movie you’re looking for doesn’t exist or may have been removed.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center w-full  dark:bg-black dark:text-white">
      <Header />
      <div className="p-10 w-300 ">
        <div className="flex justify-between">
          <div>
            <h1 className="text-3xl font-bold">{movie.title}</h1>
            <p>
              {movie.release_date} · {movie.original_language}
            </p>
          </div>
          <div>
            <p className="text-yellow-500 mt-2 flex items-center gap-2">
              <img src="/star.svg" alt="" className="h-4 w-4" />
              {movie.vote_average.toFixed(1)} / 10
            </p>
          </div>
        </div>

        {movie.poster_path && (
          <div className="flex gap-10 justify-center items-center">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="mt-6 rounded-xs h-120"
            />
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`}
              alt={movie.title}
              className="mt-6 rounded-xs w-3xl h-120"
            />
          </div>
        )}
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex gap-2">
            {movie.genres?.map((genre) => (
              <div
                key={genre.id}
                className="px-3 py-1 text-xs border border-stone-400 rounded-xl dark:dark:border-gray-700"
              >
                {genre.name}
              </div>
            ))}
          </div>
          <p className="mt-4 max-w-2x ">{movie.overview}</p>

          <div className="flex flex-col gap-2">
            <div className="flex gap-13.25 mt-15 pb-4 w-290 border-b-2 border-gray-100 dark:border-gray-700">
              <p className="font-bold">Director</p>
              <p>{director?.name || "N/A"}</p>
            </div>
            <div className="flex gap-13.25 mt-4 pb-4 w-290 border-b-2 border-gray-100 dark:border-gray-700">
              <p className="font-bold">Writers</p>
              <p>
                {writers?.length
                  ? writers.map((w: any) => w.name).join(", ")
                  : "N/A"}
              </p>
            </div>
            <div className="flex gap-13.25 mt-4 pb-4 w-290 border-b-2 border-gray-100 dark:border-gray-700">
              <p className="font-bold">Cast</p>
              <p>
                {cast?.length
                  ? cast.map((actor: any) => actor.name).join(", ")
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-290">
        <iframe
          src={"https://www.vidking.net/embed/movie/" + id}
          width="100%"
          height="600"
          allowFullScreen
        ></iframe>
      </div>
      <div className="mt-10 w-full max-w-5xl">
        <h2 className="text-xl font-semibold mb-4">More Like This</h2>

        <div className="flex gap-4 overflow-x-auto pb-2">
          {recommendations?.slice(0, 10).map((rec) => (
            <Link
              href={`/movie/${rec.id}`}
              key={rec.id}
              className="min-w-37.5 cursor-pointer hover:opacity-80"
            >
              {rec.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${rec.poster_path}`}
                  alt={rec.title}
                  className="rounded-md"
                />
              ) : (
                <div className="w-37.5 h-56.25 bg-gray-300 rounded-md" />
              )}
              <p className="text-sm mt-2">{rec.title}</p>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
