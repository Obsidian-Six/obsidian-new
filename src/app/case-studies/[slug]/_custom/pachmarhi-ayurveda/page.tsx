import ADS from "./_components/ads";
import Approach from "./_components/approach";
import BrandAwareness from "./_components/brand-awareness";
import Challenges from "./_components/challenges";
import Conclusion from "./_components/conclusion";
import ECommerce from "./_components/e-commerce";
import Hero from "./_components/hero";
import Impact from "./_components/impact";
import Industry from "./_components/industry";
import Results from "./_components/results";
import Revealer from "./_components/revealer";
import SocialMedia from "./_components/social-media";
import Transformation from "./_components/transformation";
import "./_css/styles.css";

export default async function Page() {
  return (
    <>
      <Hero />
      <Industry />
      <Challenges />
      <Approach />
      <ADS />
      <SocialMedia />
      <Transformation />
      <ECommerce />
      <BrandAwareness />
      <Results />
      <Impact />
      <Conclusion />
      <Revealer />
    </>
  );
}
