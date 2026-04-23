import { Header } from "./components/Header";
import { Upcoming } from "./components/Upcoming";
import { Soon } from "./components/Soon";
import { Popular } from "./components/Popular";
import { TopRated } from "./components/TopRated";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col gap-5 w-full min-h-screen items-center mt-5">
      <Header />
      <Upcoming />
      <div className="flex flex-col gap-25">
        <Soon />
        <Popular />
        <TopRated />
      </div>
      <Footer />
    </div>
  );
}
