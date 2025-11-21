import Banner from "./_components/banner";
import ContactUs from "./_components/contact-us";
import HomeService from "./_components/service";
import Maintenance from "./_components/maintenance";
import OurWork from "./_components/our-work";
import Reviews from "./_components/reviews";
import OurClients from "./_components/our-clients";
import Hero from "./_components/hero";

export default function Home() {
  return (
    <>
      <Hero />
      <OurWork />
      <HomeService />
      <Banner />
      <Maintenance />
      <Reviews />
      {/* <OurTeam /> */}
      <ContactUs />
      <OurClients />
    </>
  );
}
