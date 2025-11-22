export default async function ADS() {
  return (
    <section className="ads">
      <h2 className="ads__title">Targeted Paid Ad Campaigns</h2>
      <p className="ads__subtitle">
        Established Pachmarhi Ayurveda as a credible and trustworthy brand in
        the online market
      </p>
      <div className="ads__card-container">
        <div className="ads__card">
          <svg
            width="74"
            height="74"
            viewBox="0 0 74 74"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <rect width="74" height="74" fill="url(#pattern0_304_108)" />
            <defs>
              <pattern
                id="pattern0_304_108"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use xlinkHref="#image0_304_108" transform="scale(0.0104167)" />
              </pattern>
              <image
                id="image0_304_108"
                width="96"
                height="96"
                preserveAspectRatio="none"
                xlinkHref="data:image/png;base64,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"
              />
            </defs>
          </svg>
          <h3>1.2M+</h3>
          <p>People Reached</p>
        </div>
        <div className="ads__card">
          <svg
            width="74"
            height="74"
            viewBox="0 0 74 74"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <rect width="74" height="74" fill="url(#pattern0_304_109)" />
            <defs>
              <pattern
                id="pattern0_304_109"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use xlinkHref="#image0_304_109" transform="scale(0.0104167)" />
              </pattern>
              <image
                id="image0_304_109"
                width="96"
                height="96"
                preserveAspectRatio="none"
                xlinkHref="data:image/png;base64,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"
              />
            </defs>
          </svg>
          <h3>15K+</h3>
          <p>Visited the business</p>
        </div>
        <div className="ads__card">
          <svg
            width="74"
            height="74"
            viewBox="0 0 74 74"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <rect width="74" height="74" fill="url(#pattern0_304_110)" />
            <defs>
              <pattern
                id="pattern0_304_110"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use xlinkHref="#image0_304_110" transform="scale(0.0104167)" />
              </pattern>
              <image
                id="image0_304_110"
                width="96"
                height="96"
                preserveAspectRatio="none"
                xlinkHref="data:image/png;base64,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"
              />
            </defs>
          </svg>
          <h3>1.85K+</h3>
          <p>Successful Sales</p>
        </div>
        <div className="ads__card">
          <svg
            width="74"
            height="74"
            viewBox="0 0 74 74"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <rect width="74" height="74" fill="url(#pattern0_304_111)" />
            <defs>
              <pattern
                id="pattern0_304_111"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use xlinkHref="#image0_304_111" transform="scale(0.0104167)" />
              </pattern>
              <image
                id="image0_304_111"
                width="96"
                height="96"
                preserveAspectRatio="none"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAE8UlEQVR4nO2aT2wUVRzHn17EC0Y6M4bEhAuJ8YBnlG7pNiURIxeILFpMiTtvW0BIOK3Sg0gp4KVYqOJuF0taxxoroSezHvC9xYgHm6VeGg56NpHoycSDic/8RicsbYf5+2bezvw+yTdpmt19732/789v/hCCIAiCIAiCIAiCIEiG0U1e1SkXUZX2OEjeQyBIuiFEbB6JGoL9A0h6IcTQNBIlBJIH9DLbvm2YbZLdjlG+/YJG+Z8YQAdbyvx5zeS/apT/8Mzo9waRab7J7+MKWDcj2W/OYDWT/9zz1q3niCLmZzoAw80Uk/3RU+FF6e3kOQDDyxST/91DWyPS28ljAEYQU0w2Rd4Tj8tuR6PM9WAmWcIIMSM1yhefPXXnSVntwBkEn3crUUlWMCJsB0EqpDDmO9/dKASSBYwY9mKNsl+gZJVlvlsIpNuJw3zdR4UUh/kbhUC6mVjNp+4VUpzmrw2BZOUiS/cwRaN8KWAY44SIx4wK3xGkHT/mO+iUnSF5MN+o8B1gJpga7FzgS7LM71oCbwcVMP8BWrlV0ij/K85tC82n/sx30Mvf7vI7s6O0kyniMr/zFrVO+T00PwXzHTaX72zRTdZC81Mw32H7ia+f0CifR/NTMP8BUCGxMzpl/6D5Ei9+vPCqkHJjPqBTditJ8x16yqxfp+x32e0oz1NHv3tap3w5SfPdKqRczXy/IciekZv/r5Bya77D1grTNMp+esh8k99PYjvYNsw2wWogeadzJeRuL1ZpJcDBjOYjCIIgSEh2TvYKVK9vhfUZA5jEAEQWhAFM5jCA4vQeYa0uZFrF6T3qBtB3eSB1gyzJKkwV1Q3gwPVS6gZZkrV/9qC6AYzz86kbZEnWWXZOzQCO3TwhffC1dkNUm6dFae4Nsbe+TxSm+m3B36W5IVFtjtmfkd2PozffTj8AOIxg8LDtyJ75jZVPxciNY+KlS32eA3/xUkEc+aIs6nevSe3TOJuwxw4ebHQwSw8gqSU/wS/Yh3vQMhC+M9G6mFg/MxlAtTlmz+ig5neuhneaYxhAGJ2//UEk8ztDgFWEAQRQvd0Ite24afeVAelnQqYCKH9JYzPfkbk4igH4Ua3d8FXtBBX8Zr09k48AwMTD1rAoXB6wNWQNi4+WP/E1kGrzdOzmO/J7IIfpvzIBQOf7rwyu6xD8z88MLM0NSQvg9fkhX+aH6b8yAcDMcTPgzc+PeBqwt/aqtADgitmr/bD9VyYAWLKPqka8DCjEWP2sFfx2lPYf1X9lAujr8gD6uj0AOLDcBgDL28uAl2v7Ut2CwvZfmQCmf7zqeoh9vHzV04BD8/IO4UOfHfZsP2z/lQkABNUCHFiwnEEwc/yYbylShobpv1IBqHsh1pDW78wEYK0uCHNxJPYAKl/hrQjfqt+9ZlcccZkP28jMCt6MC6QLeDs63QCs1QX70Iz6QObdb/CBTCRNtC6G2o5g24GHOkn1M/EAitOD9gNpeE8GXtWQObjGyqw4vnRS7Ppwt69qBw5x2Q9g3mfn7LH/91B+MPkA1gpe1ZA9y+rtGXtbgou1V2rwWkrRFvwNdzphu5FZajoavXHccyIkHgAIXtVIaslbKQlmvh8vUgngwPWDqRtkSdb+2dfUDQC2g7QNsiQL9nxlA8DX03vTDQDViwHsVEQYwCQGkGsRBEEQBEEQBEEQBEHIev4FmNKuZc65SOwAAAAASUVORK5CYII="
              />
            </defs>
          </svg>
          <h3>2.4K+</h3>
          <p>Distributer Lead Generation</p>
        </div>
      </div>
    </section>
  );
}
