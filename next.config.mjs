/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
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
    ],
  },
};

export default nextConfig;
