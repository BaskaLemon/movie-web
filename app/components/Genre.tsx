"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Genre } from "../type";
import { tmdb } from "@/lib/tmdb";

export const Genres = () => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const [genres, setGenres] = useState<Genre[]>([]);
  useEffect(() => {
    tmdb.get("/genre/movie/list").then((res) => {
      setGenres(res.data.genres);
    });
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          setIsVisible(!isVisible);
        }}
        className="w-24.25 h-9 px-4 py-2 border border-stone-200 shadow-3xl items-center flex justify-center rounded-lg gap-2 cursor-pointer hover:scale-105 transition-transform"
      >
        <img src="/chevron-down.svg" alt="" />
        Genre
      </button>
      <div
        data-shown={isVisible}
        className={`absolute z-10 duration-300  p-5 bg-white border border-[#E4E4E7] rounded-lg mt-1 data-[shown=true]:visible data-[shown=true]:opacity-100 invisible opacity-0`}
      >
        <div className="mt-1 font-semibold text-2xl text-[#09090B]">Genres</div>
        <div className="text-[#09090B]">See lists of movies by genre</div>
        <hr className="border border-[#E4E4E7] my-4" />
        <div className="flex flex-wrap gap-4 max-w-135">
          {genres.map((genre, i) => (
            <button
              onClick={() => {
                const slug = genre.name.toLowerCase().replace(/\s+/g, "-");
                router.push(`/genre/${slug}`);
              }}
              key={i}
              className="border cursor-pointer hover:scale-105 transition-transform duration-300 text-xs font-semibold py-0.5 pl-2.5 pr-1 border-[#E4E4E7] rounded-full flex items-center gap-2"
            >
              {genre.name}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12L10 8L6 4"
                  stroke="#09090B"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
