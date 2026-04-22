import { Header } from "./components/Header";
import { Upcoming } from "./components/Upcoming";
import { Soon } from "./components/Soon";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 items-center h-screen w-screen p-4 ">
      <Header />
      <Upcoming />
      <Soon />
    </div>
  );
}
