import Image from "next/image";

export default async function Challenges() {
  return (
    <section className="challenges">
      <div className="challenges__title-container">
        <h2 className="challenges__title">[Challenges]</h2>
        <p className="challenges__text">
          Despite their strong offline reputation,
          <span>Pachmarhi Ayurveda</span> faced several hurdles in the digital
          space
        </p>
      </div>
      <ul className="challenges_items">
        <li className="challenges__item">
          <h3 className="challenges_item-title">
            Limited <span>Digital Presence</span>
          </h3>
          <p className="challenges_item-body">
            No significant reach or branding across online platforms.
          </p>
        </li>
        <li className="challenges__item">
          <h3 className="challenges_item-title">
            No <span>Social Media Strategy</span>
          </h3>
          <p className="challenges_item-body">
            Struggled with organic reach and lacked engaging content.
          </p>
        </li>
        <li className="challenges__item">
          <h3 className="challenges_item-title">
            No <span>E-commerce website</span>
          </h3>
          <p className="challenges_item-body">
            Initially, the client did not believe in the power of digital
            platforms.
          </p>
        </li>
        <li className="challenges__item">
          <h3 className="challenges_item-title">
            <span>Trust</span> issues in the ayurvedic industry
          </h3>
          <p className="challenges_item-body">
            Many fake brands existed in the market, making credibility a key
            factor.
          </p>
        </li>
      </ul>
      <Image
        className="challenges__dart-board"
        src="/case-studies/custom/pachmarhi-ayurveda/images/dart-board.png"
        alt="Dart Board"
        width={400}
        height={400}
      />
    </section>
  );
}
