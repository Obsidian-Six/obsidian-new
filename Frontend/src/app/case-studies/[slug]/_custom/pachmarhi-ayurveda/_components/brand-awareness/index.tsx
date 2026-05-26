import Image from "next/image";

export default async function BrandAwareness() {
  return (
    <section className="pr">
      <div className="pr__block">
        <h3 className="pr__block-title">PR & Brand Awareness Initiatives</h3>
        <p className="pr__block-text">
          Built credibility through media coverage and online trust-building
          efforts.
        </p>
      </div>
      <figure className="pr__image">
        <Image
          src="/case-studies/custom/pachmarhi-ayurveda/images/pr.png"
          alt="PR"
          width={800}
          height={400}
        />
        <figcaption>
          Recognized with First Prize at 10th International Herbal Trade Fair
        </figcaption>
      </figure>
      <div className="pr__logos">
        <Image
          src="/case-studies/custom/pachmarhi-ayurveda/images/times_of_india.png"
          alt="Times OF India"
          width={100}
          height={50}
        />
        <Image
          src="/case-studies/custom/pachmarhi-ayurveda/images/news_pulse_india.png"
          alt="News Pulse "
          width={100}
          height={50}
        />
        <Image
          src="/case-studies/custom/pachmarhi-ayurveda/images/news_today.png"
          alt="Newz Today "
          width={100}
          height={50}
        />
        <Image
          src="/case-studies/custom/pachmarhi-ayurveda/images/express_times.png"
          alt="Express Times"
          width={100}
          height={50}
        />
        <Image
          src="/case-studies/custom/pachmarhi-ayurveda/images/common_topics.png"
          alt="Common Topics"
          width={100}
          height={50}
        />
        <Image
          src="/case-studies/custom/pachmarhi-ayurveda/images/the_hindustan_express.png"
          alt="The Hindustan Express"
          width={100}
          height={50}
        />
      </div>
    </section>
  );
}
