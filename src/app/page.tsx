import Banner from "./_components/banner";
import ContactUs from "./_components/contact-us";
import FloatingWhatsapp from "./_components/FloatingWhatsapp";
import Footer from "./_components/footer";
import HeroSection from "./_components/hero-section";
import HomeService from "./_components/home-service";
import Navbar from "./_components/navbar";
import OurClient from "./_components/our-client";
import OurMaintaince from "./_components/our-maintaince";
import OurWork from "./_components/our-work";
import Reviews from "./_components/reviews";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <HeroSection />
      <OurWork />
      <HomeService />
      <Banner />
      <OurMaintaince />
      <Reviews />
      {/* <OurTeam /> */}
      <ContactUs />
      <OurClient />
      <FloatingWhatsapp />
      <Footer />
    </div>
  );
}
