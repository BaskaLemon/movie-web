import React from "react";

export const MovieCardSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="w-full h-64 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mt-3 w-3/4"></div>
      <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded mt-2 w-1/2"></div>
    </div>
  );
};
