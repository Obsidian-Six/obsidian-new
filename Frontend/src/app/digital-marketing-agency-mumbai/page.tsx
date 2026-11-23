import LandingPage from "../_components/landing/LandingPage";
import { landingPages } from "@/lib/store/landing-pages";
import { pageMeta } from "@/lib/seo";

const data = landingPages["digital-marketing-agency-mumbai"]!;

export const metadata = pageMeta({
  path: data.path,
  title: data.metaTitle,
  description: data.metaDescription,
});

export default function Page() {
  return <LandingPage data={data} />;
}
