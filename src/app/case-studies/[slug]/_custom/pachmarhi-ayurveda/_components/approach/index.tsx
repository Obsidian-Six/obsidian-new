import Image from "next/image";

export default async function Approach() {
  return (
    <section className="approach">
      <h2 className="approach__title">[Our Approach]</h2>
      <div className="approach__block">
        <h3 className="approach__block-title">Rebranding Digital Presence</h3>
        <p className="approach__block-text">
          Established Pachmarhi Ayurveda as a credible and trustworthy brand in
          the online market
        </p>
      </div>
      <figure className="approach__laptop-mockup reveal">
        <Image
          src="/case-studies/custom/pachmarhi-ayurveda/images/laptop-mockup.png"
          alt="Laptop Mockup"
          width={800}
          height={400}
        />
      </figure>
    </section>
  );
}
