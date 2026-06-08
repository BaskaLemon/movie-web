"use client";
import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Upcoming } from "./components/Upcoming";
import { Soon } from "./components/Soon";
import { Popular } from "./components/Popular";
import { TopRated } from "./components/TopRated";
import { Footer } from "./components/Footer";
import { FrontSkeleton } from "./components/FrontSkeleton";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([]).finally(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <FrontSkeleton />;

  return (
    <div className="container">
      <div className="flex flex-col gap-5 w-screen min-h-screen items-center dark:text-white dark:bg-black">
        <Header />
        <Upcoming />
        <div className="flex flex-col gap-25">
          <Soon />
          <Popular />
          <TopRated />
        </div>
        <Footer />
      </div>
    </div>
  );
}
