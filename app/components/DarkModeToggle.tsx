/* eslint-disable @next/next/no-img-element */
"use client";
import { useTheme } from "./ThemeContext";

export const DarkModeToggle = () => {
  const { dark, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className=" border border-stone-200 w-9 h-9 rounded-lg flex justify-center items-center hover:scale-105 transition-transform cursor-pointer dark:border-gray-700"
    >
      {dark ? (
        <img src="/moon (1).svg" alt="" />
      ) : (
        <img src="/moon.svg" alt="" />
      )}
    </button>
  );
};
