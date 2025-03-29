import React from "react";

const TheResult = ({ele}) => {
  console.log(ele.result[0],"dfghjm")
  return (
    <div className="bg-[#19183A] md:py-32 py-10">
      <div className="md:w-[60%] w-[80%] mx-auto">
        <p className="md:text-6xl sm:text-4xl text-3xl text-center poppins text-white">THE RESULTS</p>
        
        <div>
          <div className="md:py-20 py-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex justify-center">
                <img
                  alt="Scenic view of green hills and mountains"
                  className="rounded-lg md:h-72 sm:h-52 h-44 w-full"
                  src={ele.result[0].img}
                />
              </div>
              <div className="bg-white p-6 rounded-lg flex flex-col justify-center md:col-span-3">
                <h2 className="text-center text-[#5A00EC] md:text-3xl text-xl">
                {ele.result[0].title} {" "}
                  <span className="highlight">{ele.result[0].highlight}</span>
                </h2>
                <p className="text-center text-gray-600 md:text-2xl text-base md:px-10 md:mt-10 mt-6">
                {ele.result[0].data}
                </p>
              </div>
            </div>
            <div className="flex justify-center my-4">
              <div className="border-l-2 border-[#5A00EC] md:h-16 h-10"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-lg flex flex-col justify-center md:col-span-3 order-last md:order-none">
                <h2 className="text-center text-[#5A00EC] md:text-3xl text-xl">
                {ele.result[1].title} {" "}
                  <span className="highlight">{ele.result[1].highlight} </span>
                  
                </h2>
                <p className="text-center text-gray-600 md:text-2xl text-base md:px-10 md:mt-10 mt-6">
                {ele.result[1].data}
                </p>
              </div>
              <div className="flex justify-center">
                <img
                  alt="Scenic view of green hills and mountains"
                  className="rounded-lg md:h-72 sm:h-52 h-44 w-full"
                  src={ele.result[1].img}
                />
              </div>
            </div>
            
            <div className="flex justify-center my-4">
              <div className="border-l-2 border-[#5A00EC] md:h-16 h-10"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex justify-center">
                <img
                  alt="Scenic view of green hills and mountains"
                  className="rounded-lg md:h-72 sm:h-52 h-44 w-full"
                  src={ele.result[2].img}
                />
              </div>
              <div className="bg-white p-6 rounded-lg flex flex-col justify-center md:col-span-3">
                <h2 className="text-center text-[#5A00EC] md:text-3xl text-xl">
                {ele.result[2].title}  {" "}
                  <span className="highlight">{ele.result[2].highlight}</span>
                </h2>
                <p className="text-center text-gray-600 md:text-2xl text-base md:px-10 md:mt-10 mt-6">
                {ele.result[2].data}
                </p>
              </div>
            </div>
            <div className="flex justify-center my-4">
              <div className="border-l-2 border-[#5A00EC] md:h-16 h-10"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-lg flex flex-col justify-center md:col-span-3 order-last md:order-none">
                <h2 className="text-center text-[#5A00EC] md:text-3xl text-xl">
                {ele.result[3].title}  {" "}
                  <span className="highlight"> {ele.result[3].highlight} </span>
                </h2>
                <p className="text-center text-gray-600 md:text-2xl text-base md:px-10 md:mt-10 mt-6">
                {ele.result[3].data}
                </p>
              </div>
              <div className="flex justify-center">
                <img
                  alt="Scenic view of green hills and mountains"
                  className="rounded-lg md:h-72 sm:h-52 h-44 w-full"
                  src={ele.result[2].img}
                />
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default TheResult;
