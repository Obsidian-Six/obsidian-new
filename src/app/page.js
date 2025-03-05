import Banner from "./_components/banner";
import HeroSection from "./_components/hero-section";
import HomeService from "./_components/home-service";
import Navbar from "./_components/navbar";
import OurWork from "./_components/our-work";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <HeroSection />
      <OurWork />
      <HomeService />
      <Banner />

    </div>
  );
}
