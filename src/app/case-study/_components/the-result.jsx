import React from "react";

const TheResult = () => {
  return (
    <div className="bg-[#19183A] py-32">
      <div className="w-[60%] mx-auto">
        <p className="text-6xl text-center poppins text-white">THE RESULTS</p>
        <div>
          <div className="py-20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex justify-center">
                <img
                  alt="Scenic view of green hills and mountains"
                  className="rounded-lg h-72"
                  src="https://storage.googleapis.com/a1aa/image/T_kWvK97-hQhiFsMJMEb_8cUyB7ANVyRZ8LC0_H3BS4.jpg"
                />
              </div>
              <div className="bg-white p-6 rounded-lg flex flex-col justify-center col-span-3">
                <h2 className="text-center text-[#5A00EC] text-3xl">
                  DOMINATING {" "}
                  <span className="highlight">DIGITAL PRESENCE</span>
                </h2>
                <p className="text-center text-gray-600 text-2xl px-10 mt-10">
                  Became one of the top Ayurvedic brands online with a strong
                  following
                </p>
              </div>
            </div>
            <div className="flex justify-center my-4">
              <div className="border-l-2 border-[#5A00EC] h-8"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheResult;
