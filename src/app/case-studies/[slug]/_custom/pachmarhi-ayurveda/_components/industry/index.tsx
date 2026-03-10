export default async function Industry() {
  return (
    <section className="industry">
      <div className="industry__title-container">
        <p className="industry__subtitle">[Industry]</p>
        <h2 className="industry__title">Healthcare</h2>
      </div>

      <div className="industry__services-container">
        <h3 className="industry__services-heading">Services Provided</h3>
        <button type="button" className="industry__services-button">
          <span className="icon-box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="26"
              height="26"
              role="img"
              aria-labelledby="title-angle-filled"
              className="icon icon-angle-filled"
              fill="currentColor"
            >
              <title id="title-angle-filled">Filled angle brackets</title>
              <path d="M6.9 5.6 2.5 12l4.4 6.4c.2.3.7.4 1 .2.3-.2.4-.7.2-1L4.1 12l4.4-5.6c.3-.4.1-1-.2-1.2-.4-.2-.9-.1-1.4.4zM17.1 5.6c-.4-.5-1-.6-1.4-.4-.3.2-.5.8-.2 1L19.9 12l-4.4 6.4c-.2.3-.1.8.2 1 .3.2.8.1 1-.2L21.5 12l-4.4-6.4z" />
            </svg>
          </span>
          <span className="label"> Website Development </span>
        </button>
        <button type="button" className="industry__services-button">
          <span className="icon-box">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
              <path d="M468 64C487.2 64 505.6 71.6 519.1 85.2L554.8 120.9C568.4 134.4 576 152.8 576 172C576 191.2 568.4 209.6 554.8 223.1L509.9 268L372 130.1L416.9 85.2C430.4 71.6 448.8 64 468 64zM122.9 379.1L338.1 164L476 301.9L260.9 517.1C250.2 527.8 236.8 535.6 222.2 539.7L94.4 575.1C86.1 577.4 77.1 575.1 71 568.9C64.9 562.7 62.5 553.8 64.8 545.5L100.4 417.8C104.5 403.2 112.2 389.9 123 379.1zM289.4 144.8L144.8 289.4L75.7 220.3C60.1 204.7 60.1 179.4 75.7 163.7L163.7 75.7C179.3 60.1 204.6 60.1 220.3 75.7L226.2 81.6L169.9 137.9C162.1 145.7 162.1 158.4 169.9 166.2C177.7 174 190.4 174 198.2 166.2L254.5 109.9L289.4 144.8zM495.2 350.6L530.1 385.5L473.8 441.8C466 449.6 466 462.3 473.8 470.1C481.6 477.9 494.3 477.9 502.1 470.1L558.4 413.8L564.3 419.7C579.9 435.3 579.9 460.6 564.3 476.3L476.3 564.3C460.7 579.9 435.4 579.9 419.7 564.3L350.6 495.2L495.2 350.6z" />
            </svg>
          </span>
          <span className="label"> UI/UX Design </span>
        </button>
        <button type="button" className="industry__services-button">
          <span className="icon-box">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
              <path d="M96 160L96 400L544 400L544 160L96 160zM32 160C32 124.7 60.7 96 96 96L544 96C579.3 96 608 124.7 608 160L608 400C608 435.3 579.3 464 544 464L96 464C60.7 464 32 435.3 32 400L32 160zM192 512L448 512C465.7 512 480 526.3 480 544C480 561.7 465.7 576 448 576L192 576C174.3 576 160 561.7 160 544C160 526.3 174.3 512 192 512z" />
            </svg>
          </span>
          <span className="label"> Digital Marketing </span>
        </button>
      </div>

      <div className="industry__overview">
        <h3 className="industry__overview-heading">Overview</h3>
        <p className="industry__overview-text">
          Pachmarhi Ayurveda is a well-established Ayurvedic brand rooted in the
          heart of Madhya Pradesh. Known for its pure and effective natural oils
          and remedies, the brand has built a loyal customer base through
          offline sales and word-of-mouth marketing. However, in an increasingly
          digital world, their lack of an online presence limited their growth
          potential. In 2022, we partnered with them to take their brand
          digital, establish a strong online identity, and unlock nationwide
          sales opportunities.
        </p>
      </div>
    </section>
  );
}
