/* eslint-disable @next/next/no-img-element */

export const Header = () => {
  return (
    <div className="w-screen justify-center items-center flex ">
      <div className="flex h-14.75 w-375 justify-between items-center p-4">
        <div className="flex gap-2 items-center">
          <img src="film.svg" alt="" />
          <p className="text-indigo-500 font-bold text-[16px]">Movie Z</p>
        </div>
        <div className="flex gap-2">
          <div className="w-24.25 h-9 px-4 py-2 border border-stone-200 shadow-3xl items-center flex justify-center rounded-lg gap-2">
            <img src={"chevron-down.svg"} alt="" />
            <button>Genre</button>
          </div>
          <div className="border h-9 border-stone-200 flex flex-row-reverse items-center p-1 rounded-lg shadow-3xl">
            <input className="w-94.75 "></input>
            <img src={"_magnifying-glass.svg"} alt="" className="w-4 h-4" />
          </div>
        </div>
        <div>
          <button className=" border border-stone-200 w-9 h-9 rounded-lg flex justify-center items-center">
            <img src={"moon.svg"} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};
