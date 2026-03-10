import Image from "next/image";

export default async function SocialMedia() {
  return (
    <section className="social-media">
      <div className="social-media__block">
        <h2 className="social-media__title">Organic Social Media Growth</h2>
        <p className="social-media__text">
          Developed engaging and educational content that resonated with
          Ayurveda audiences.
        </p>
      </div>
      <figure className="social-media__image reveal">
        <Image
          src="/case-studies/custom/pachmarhi-ayurveda/images/instagram-mockup.png"
          alt="Instagram Mockup"
          width={800}
          height={400}
        />
      </figure>
    </section>
  );
}
