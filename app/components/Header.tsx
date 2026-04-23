/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { Genre } from "./Genre";

export const Header = () => {
  return (
    <div className="w-screen justify-center items-center flex ">
      <div className="flex h-14.75 w-375 justify-between items-center p-4">
        <Link className="flex gap-2 items-center" href={"/"}>
          <img src="film.svg" alt="" />
          <p className="text-indigo-500 font-bold text-[16px]">Movie Z</p>
        </Link>
        <div className="flex gap-2">
          <Genre />
          <div className="border h-9 border-stone-200 flex flex-row-reverse items-center p-3 rounded-lg shadow-3xl">
            <input className="w-94.75 "></input>
            <img src={"_magnifying-glass.svg"} alt="" className="w-4 h-4" />
          </div>
        </div>
        <div>
          <button className=" border border-stone-200 w-9 h-9 rounded-lg flex justify-center items-center hover:scale-105 transition-transform cursor-pointer">
            <img src={"moon.svg"} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};
