/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,

    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.wordpress.com',
      },
      { protocol: "https", hostname: "www.claimsnidan.com", pathname: "/**" },
      { protocol: "https", hostname: "sdg.esa.int", pathname: "/**" },
      { protocol: "https", hostname: "boxxinsurance.com", pathname: "/**" },
      {
        protocol: "https",
        hostname: "associationoflearning.com",
        pathname: "/**",
      },
      { protocol: "https", hostname: "5.imimg.com", pathname: "/**" },
      { protocol: "https", hostname: "www.igrowmybiz.com", pathname: "/**" },
      { protocol: "https", hostname: "animationvisarts.com", pathname: "/**" },
      { protocol: "https", hostname: "logos-world.net", pathname: "/**" },
      { protocol: "https", hostname: "pachmarhiayurveda.com", pathname: "/**" },
      { protocol: "https", hostname: "funnel.io", pathname: "/**" },
      { protocol: "https", hostname: "www.tenontenstays.com", pathname: "/**" },
      { protocol: "https", hostname: "www.rezmytour.com", pathname: "/**" },
      {
        protocol: "https",
        hostname: "www.truevalueventures.in",
        pathname: "/**",
      },
      {
        protocol: 'https',
        hostname: '**.wp.com', // Covers i0.wp.com, i1.wp.com, etc.
      },
      { protocol: "https", hostname: "www.shim.co.in", pathname: "/**" },
      { protocol: "https", hostname: "upload.wikimedia.org", pathname: "/**" },
      { protocol: "http", hostname: "tenontenstays.com", pathname: "/**" },
      { protocol: "https", hostname: "connectfz.com", pathname: "/**" },
      { protocol: "https", hostname: "azbigmedia.com", pathname: "/**" },
      { protocol: "https", hostname: "img.freepik.com", pathname: "/**" },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/**",
      },
      { protocol: "https", hostname: "www.thegyef.com", pathname: "/**" },
      { protocol: "https", hostname: "sportxcoins.com", pathname: "/**" },
      { protocol: "https", hostname: "www.4dgcc.com", pathname: "/**" },
      // Added for services/reviews original assets
      { protocol: "https", hostname: "images.pexels.com", pathname: "/**" },
      { protocol: "https", hostname: "media.licdn.com", pathname: "/**" },
      {
        protocol: "https",
        hostname: "content.jdmagicbox.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn2.gstatic.com",
        pathname: "/**",
      },
      { protocol: "https", hostname: "www.khonshnaw.com", pathname: "/**" },
      { protocol: "https", hostname: "rehabmasters.in", pathname: "/**" },
    ],
  },
};

export default nextConfig;
