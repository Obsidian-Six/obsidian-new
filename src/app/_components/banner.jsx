import React from "react";

const Banner = () => {
  return (
    <div
      className="h-[50vh] sm:h-[75vh] md:h-[90vh] bg-cover bg-center bg-no-repeat "
      style={{
        backgroundImage:
          "url('https://www.monster.com.vn/career-advice/wp-content/uploads/2021/08/PCM-Students-After-Class-12th.jpg')",
        backgroundAttachment: "fixed",
      }}
    ></div>
  );
};

export default Banner;
