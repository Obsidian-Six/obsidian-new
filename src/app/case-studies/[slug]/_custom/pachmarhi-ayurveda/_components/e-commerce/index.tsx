import VideoControl from "./video-control";

export default async function ECommerce() {
  return (
    <section className="e-commerce">
      <h2 className="e-commerce__title">E-commerce Website Development</h2>
      <p className="e-commerce__text">
        Designed and launched a user-friendly, conversion-optimized website
        within one month.
      </p>
      <figure id="e-commerce-video-wrapper" className="e-commerce__video">
        <video id="e-commerce-video" loop muted>
          <source
            src="/case-studies/custom/pachmarhi-ayurveda/videos/e-commerce.mp4"
            type="video/mp4"
          />
        </video>
      </figure>
      <VideoControl />
    </section>
  );
}
