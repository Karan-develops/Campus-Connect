import HeroGeometric from "./NewHero";
import FAQS from "./FAQS";
import HomeNewFeatures from "./HomeNewFeatures";
import Marquee from "./Marquee";
import Hero2 from "./Hero2";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <HeroGeometric />
      <Hero2/>
      <Marquee />
      <HomeNewFeatures />
      <div className="p-24">
        <span className="flex justify-center align-middle text-8xl mb-11">FAQS</span>
        <FAQS />
      </div>
    </div>
  );
}
