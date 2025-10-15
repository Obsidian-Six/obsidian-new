import Banner from "./_components/banner";
import ContactUs from "./_components/contact-us";
import FloatingWhatsapp from "./_components/FloatingWhatsapp";
import Footer from "./_components/footer";
import HeroSection from "./_components/hero-section";
import HomeService from "./_components/home-service";
import OurClient from "./_components/our-client";
import Maintenance from "./_components/maintenance";
import OurWork from "./_components/our-work";
import Reviews from "./_components/reviews";

export default function Home() {
  return (
    <>
      <HeroSection />
      <OurWork />
      <HomeService />
      <Banner />
      <Maintenance />
      <Reviews />
      {/* <OurTeam /> */}
      <ContactUs />
      <OurClient />
      <FloatingWhatsapp />
      <Footer />
    </>
  );
}
