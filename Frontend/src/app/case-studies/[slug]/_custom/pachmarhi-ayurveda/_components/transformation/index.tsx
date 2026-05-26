import Image from "next/image";

export default async function Transformation() {
  return (
    <section className="transformation">
      <div className="transformation__block-wrapper">
        <div className="transformation__block transformation__before">
          <h3 className="transformation__title">Before</h3>
          <div className="transformation__body">
            <figure className="transformation__image">
              <Image
                src="/case-studies/custom/pachmarhi-ayurveda/images/before.png"
                alt="Before"
                width={800}
                height={400}
              />
            </figure>
            <ul className="transformation__items">
              <li className="transformation__item">
                ❗Inconsistent brand colors
              </li>
              <li className="transformation__item">
                ❗Random posting schedule
              </li>
              <li className="transformation__item">
                ❗Low audience engagement
              </li>
              <li className="transformation__item">❗Weak visual quality</li>
            </ul>
          </div>
        </div>
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transformation__double-arrow"
        >
          <path
            d="M21.9826 15L12.8663 24.1162L14.6338 25.8837L25.5176 15L14.6338 4.11621L12.8663 5.88371L21.9826 15Z"
            fill="#19183A"
          />
          <path
            d="M7.13383 4.11621L5.36633 5.88371L14.4826 15L5.36633 24.1162L7.13383 25.8837L18.0176 15L7.13383 4.11621Z"
            fill="#19183A"
          />
        </svg>

        <div className="transformation__block transformation__after">
          <h3 className="transformation__title">After</h3>
          <div className="transformation__body">
            <figure className="transformation__image">
              <Image
                src="/case-studies/custom/pachmarhi-ayurveda/images/after.png"
                alt="After"
                width={800}
                height={400}
              />
            </figure>
            <ul className="transformation__items">
              <li className="transformation__item">
                ✓ Cohesive branding calendar
              </li>
              <li className="transformation__item">✓ Strategic content</li>
              <li className="transformation__item">
                ✓ Interactive, engaging posts
              </li>
              <li className="transformation__item">
                ✓ Professional, polished visuals
              </li>
            </ul>
          </div>
        </div>
      </div>
      <h3 className="transformation__question">what improved?</h3>
      <p className="transformation__answer">
        <span className="counter">+150%</span> Followers
        <span className="separator">|</span>
        <br />
        <span className="counter">2x</span> Engagement
        <span className="separator">|</span>
        <br />
        <span className="counter">+60%</span> Website Traffic
      </p>
    </section>
  );
}
