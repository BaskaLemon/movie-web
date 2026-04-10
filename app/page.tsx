import { Header } from "./components/Header";
import { Upcoming } from "./components/Upcoming";

export default function Home() {
  return (
    <div className="flex flex-col  items-center h-screen w-screen p-4 ">
      <Header />
      <Upcoming />
    </div>
  );
}
