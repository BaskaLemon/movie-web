import React from "react";
import { MovieCardSkeleton } from "./MovieCardSkeleton";

export const MovieGridSkeleton = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  );
};
