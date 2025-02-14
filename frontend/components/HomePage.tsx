import HeroGeometric from "./NewHero";
import FAQS from "./FAQS";
import HomeNewFeatures from "./HomeNewFeatures";
import Marquee from "./Marquee";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroGeometric />
      <Marquee />
      <HomeNewFeatures />
      <div className="p-44">
        <FAQS />
      </div>
    </div>
  );
}
