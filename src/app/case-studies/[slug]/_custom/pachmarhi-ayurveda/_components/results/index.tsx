import Image from "next/image";

export default async function Results() {
  return (
    <section className="results">
      <h2 className="results__title">THE RESULTS</h2>
      <div className="results__card">
        <div className="results__card-info">
          <h3 className="results__card-title">
            🏆 Dominating <br />
            <span>Digital Presence</span>
          </h3>
          <p className="results__card-text">
            Became one of the top Ayurvedic brands online with a strong
            following
          </p>
        </div>
        <figure className="results__card-image">
          <Image
            src="/case-studies/custom/pachmarhi-ayurveda/images/dominating-digital-presence.png"
            alt=""
            width={800}
            height={400}
          />
        </figure>
      </div>
      <div className="results__card">
        <figure className="results__card-image">
          <Image
            src="/case-studies/custom/pachmarhi-ayurveda/images/successful-e-commerce-launch.png"
            alt=""
            width={800}
            height={400}
          />
        </figure>
        <div className="results__card-info">
          <h3 className="results__card-title">
            🛒 Successful <br />
            <span>e-cOMMERECE LAUNCH</span>
          </h3>
          <p className="results__card-text">
            Enabled nationwide online sales, increasing accessibility.
          </p>
        </div>
      </div>
      <div className="results__card">
        <div className="results__card-info">
          <h3 className="results__card-title">
            💰 5-7X <br />
            <span>Monthly Growth</span>
          </h3>
          <p className="results__card-text">
            Online sales increased month over month (MoM) by 5-7X
          </p>
        </div>
        <figure className="results__card-image">
          <Image
            src="/case-studies/custom/pachmarhi-ayurveda/images/monthly-growth.png"
            alt=""
            width={800}
            height={400}
          />
        </figure>
      </div>
      <div className="results__card">
        <figure className="results__card-image">
          <Image
            src="/case-studies/custom/pachmarhi-ayurveda/images/expand-customer-base.png"
            alt=""
            width={800}
            height={400}
          />
        </figure>
        <div className="results__card-info">
          <h3 className="results__card-title">
            👥 Expanded <br />
            <span>Customer Base</span>
          </h3>
          <p className="results__card-text">
            Increased potential buyers through data-driven marketing campaigns.
          </p>
        </div>
      </div>
    </section>
  );
}
