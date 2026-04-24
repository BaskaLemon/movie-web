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

const API_KEY = "d67d8bebd0f4ff345f6505c99e9d0289";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [credits, setCredits] = useState<any>(null);
  const director = credits?.crew?.find(
    (person: any) => person.job === "Director",
  );

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    Promise.all([
      axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`),
      axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`,
      ),
    ])
      .then(([movieRes, creditsRes]) => {
        setMovie(movieRes.data);
        setCredits(creditsRes.data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-10">Loading...</div>;

  if (!movie) return <div className="p-10">Movie not found</div>;

  return (
    <div className="flex flex-col justify-center items-center">
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
              <img src={"star.svg"} alt="" className="h-4 w-4" />
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
        <div className="flex gap-2 mt-2 flex-wrap">
          {movie.genres?.map((genre) => (
            <span
              key={genre.id}
              className="px-3 py-1 text-xs border border-stone-400 rounded-xl"
            >
              {genre.name}
            </span>
          ))}
          <p className="mt-4 max-w-2x ">{movie.overview}</p>
          <div>
            <p>Director</p>
            <p></p>
          </div>
          <div></div>
          <div></div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
