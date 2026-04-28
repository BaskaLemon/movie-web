/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";

export const DarkModeToggle = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    setDark(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggle = () => {
    const newDark = !dark;
    setDark(newDark);

    if (newDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

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
