"use client";

import { useScroll } from "framer-motion";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { IoMenu } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { MotionDiv } from "../utils/page";

const Navbar = () => {
  const path = usePathname();
  const [isDrawer, setIsDrawer] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const arr = [
    { name: "Home", link: "/#home" },
    { name: "Works", link: "/#ourWork" },
    { name: "Services", link: "/#services" },
    { name: "Blogs", link: "/#blogs" },
    { name: "About Us", link: "/#aboutUs" },
    { name: "Contact Us", link: "/#contactUs" },
  ];

  return (
    <>
      {/* Sticky Navbar */}
      
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-[#d9d9d9] shadow-md py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="flex items-center justify-between max-w-screen-xl max-md:p-1 px-4 mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="/images/logo/logo1.png"
              className="h-8 mr-3 sm:h-10"
              alt="Logo"
            />
          </Link>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <IoMenu
              className="text-2xl cursor-pointer"
              onClick={() => setIsDrawer(true)}
            />
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex justify-between text-lg w-full max-w-xl">
            {arr.map((ele, i) => (
              <Link
                key={i}
                href={ele.link}
                className={`block border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-main lg:p-0 lg:hover:font-medium hover:text-heading-main ${
                  path === ele.link ? "text-primary-main font-medium" : "text-color"
                }`}
              >
                {/* {ele.name} */}
                <span className="animated-nav" alt={ele.name}>
                {ele.name.split("").map((char, index) => (
                  <i key={index}>{char === " " ? "\u00A0" : char}</i>
                ))}
              </span>
              </Link>
            ))}
          </ul>
        </div>
        
        <MotionDiv
       id="scroll-indicator"
       style={{
           scaleX: scrollYProgress,
           position: "fixed",
           top: 60,
           left: 0,
           right: 0,
           height: 4,
           originX: 0,
           backgroundColor: "#FD7B28",
       }}
      >

      </MotionDiv>
      </nav>
      {/* Mobile Drawer Navigation */}
      <div
        className={`fixed top-0 right-0 z-50 h-screen p-4 bg-gradient-to-r from-[#d9d9d9] border-l border-[#FD7B28] to-white transition-transform transform ${
          isDrawer ? "translate-x-0" : "translate-x-full"
        } w-80 lg:hidden`}
      >
        <button type="button" onClick={() => setIsDrawer(false)} className="absolute top-4 right-4">
          <RxCross1 className="text-2xl textmain" />
        </button>

        <div className="mt-12">
          <img src="/images/logo/logo2.png" className="h-10 mx-auto" alt="Logo" />
        </div>

        <div className="py-6">
          <ul className="space-y-4 font-medium text-lg">
            {arr.map((ele, i) => (
              <li key={i} className="border-b-2">
                <Link
                  href={ele.link}
                  className={`flex items-center p-3 rounded-lg hover:text-primary-main hover:bg-white ${
                    path === ele.link ? "bg-primary-main font-medium" : "text-heading-main"
                  }`}
                  onClick={() => setIsDrawer(false)}
                >
                  &#9673; <span className="ml-3">{ele.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;





// "use client";

// /* eslint-disable @next/next/no-img-element */
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import React, { useState } from "react";
// import { IoMenu } from "react-icons/io5";
// import { RxCross1 } from "react-icons/rx";
// import { RiMenu3Fill } from "react-icons/ri";

// const Navbar = () => {
//   const path = usePathname();
//   const [isDrawer, setIsDrawer] = useState(false);

//   const arr = [
//     {
//       name: "Home",
//       link: "/",
//     },
//     {
//       name: "Works",
//       link: "/Works",
//     },
//     {
//       name: "Services",
//       link: "/Services",
//     },
//     {
//       name: "Blogs",
//       link: "/Blogs",
//     },
//     {
//       name: "About Us",
//       link: "/About-Us",
//     },
//     {
//       name: "Contact Us",
//       link: "/contact-us",
//     },
//   ];

//   return (
//     <>
//       <nav className="absolute z-10 w-full text-color border-gray-200 py-4 ">
//         <div className="flex items-center justify-between max-w-screen-xl px-4 mx-auto max-md:mt-1">
//           <Link href="/" className="flex items-center">
//             <img
//               src="/images/logo/logo1.png"
//               className="h-8 mr-3 sm:h-10 scale-100"
//               alt="Logo"
//             />
//           </Link>
//           <div className="flex items-center lg:order-2">
//             <div className="hidden mt-2  sm:inline-block"></div>
//             {/* <div
//               className="text-color cursor-pointer bg-primary-main py-2 px-4 rounded text-base font-bold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg lg:inline
//          hidden"
//             > */}
//               <RiMenu3Fill className="text-3xl" />
//             {/* </div> */}
//             <div className="hidden max-lg:inline">
//               <IoMenu className="text-xl" onClick={() => setIsDrawer(true)} />
//             </div>
//           </div>

//           <ul className="lg:flex hidden justify-between mt-0 text-lg w-full max-w-xl">
//             {arr.map((ele, i) => (
//               <a
//                 key={i}
//                 href={ele.link}
//                 className={`block border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-main lg:p-0   lg:hover:font-medium  hover:text-heading-main  ${
//                   path === ele.link
//                     ? "text-primary-main font-medium"
//                     : "text-color"
//                 }`}
//               >
//                 {ele.name}
//               </a>
//             ))}
//           </ul>
//         </div>
//       </nav>
//       <div></div>
//       <div
//         className={`fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform hidden max-lg:inline ${
//           isDrawer ? "translate-x-0" : "translate-x-full"
//         } w-72 bg-primary-main`}
//       >
//         <button type="button" onClick={() => setIsDrawer(false)} className="">
//           <RxCross1 className="text-color text-xl" />
//           <span className="sr-only">Close menu</span>
//         </button>
//         <h5
//           id="drawer-navigation-label"
//           className="text-base font-semibold text-color uppercase"
//         >
//           <div className="flex items-center space-x-3 rtl:space-x-reverse mt-4">
//             <img
//               src="/assets/images/logo-white.png"
//               className="h-10"
//               alt="Logo"
//             />
//           </div>
//         </h5>
//         <div className="py-4 overflow-y-auto">
//           <ul className="space-y-4 font-medium">
//             {arr.map((ele, i) => (
//               <li key={i} className="border-b-2">
//                 <Link
//                   href={ele.link}
//                   className={`flex items-center p-2 rounded-lg text-color hover:text-primary-main  hover:bg-white group cursor-pointer ${
//                     path === ele.path
//                       ? "bg-primary-main font-medium"
//                       : "text-heading-main"
//                   }`}
//                   onClick={() => setIsDrawer(false)}
//                 >
//                   &#9673; <span className="ms-3">{ele.name}</span>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;







// "use client";

// import { useState, useEffect } from "react";
// import { motion, useScroll } from "framer-motion";
// /* eslint-disable @next/next/no-img-element */
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { IoMenu } from "react-icons/io5";
// import { RxCross1 } from "react-icons/rx";
// import { MotionDiv } from "../utils/page";

// const Navbar = () => {
//   const path = usePathname();
//   const [isDrawer, setIsDrawer] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   const { scrollYProgress } = useScroll();

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const arr = [
//     { name: "Home", link: "/#home" },
//     { name: "Works", link: "/#ourWork" },
//     { name: "Services", link: "/#services" },
//     { name: "Blogs", link: "/#blogs" },
//     { name: "About Us", link: "/#aboutUs" },
//     { name: "Contact Us", link: "/#contactUs" },
//   ];

//   return (
//     <>
//       {/* Sticky Navbar */}
//       <nav
//         className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
//           isScrolled ? "bg-[#d9d9d9] shadow-md py-3" : "bg-transparent py-5"
//         }`}
//       >
//         <div className="flex items-center justify-between max-w-screen-xl px-4 mx-auto">
//           {/* Logo */}
//           <Link href="/" className="flex items-center">
//             <img
//               src="/images/logo/logo1.png"
//               className="h-8 mr-3 sm:h-10"
//               alt="Logo"
//             />
//           </Link>

//           {/* Mobile Menu Button */}
//           <div className="lg:hidden">
//             <IoMenu
//               className="text-2xl cursor-pointer"
//               onClick={() => setIsDrawer(true)}
//             />
//           </div>

//           {/* Desktop Navigation with Hover Animation */}
//           <ul className="hidden lg:flex justify-between text-lg w-full max-w-xl">
//             {arr.map((ele, i) => (
//               <motion.li key={i} className="relative overflow-hidden group">
//                 <Link href={ele.link} className="relative block px-2 py-2">
//                   {/* Normal Text */}
//                   <span className="span-mother flex">
//                     {ele.name.split("").map((char, index) => (
//                       <span key={index} className="transition-all duration-200">
//                         {char}
//                       </span>
//                     ))}
//                   </span>

//                   {/* Hover Text Animation */}
//                   <span className="span-mother2 absolute top-0 left-2 flex">
//                     {ele.name.split("").map((char, index) => (
//                       <span
//                         key={index}
//                         className="transition-all duration-300 translate-y-[-1.2em] group-hover:translate-y-0"
//                       >
//                         {char}
//                       </span>
//                     ))}
//                   </span>
//                 </Link>
//               </motion.li>
//             ))}
//           </ul>
//         </div>

//         {/* Scroll Indicator */}
//         <MotionDiv
//           id="scroll-indicator"
//           style={{
//             scaleX: scrollYProgress,
//             position: "fixed",
//             top: 64,
//             left: 0,
//             right: 0,
//             height: 5,
//             originX: 0,
//             backgroundColor: "#FD7B28",
//           }}
//         />
//       </nav>

//       {/* Mobile Drawer Navigation */}
//       <div
//         className={`fixed top-0 right-0 z-50 h-screen p-4 bg-gradient-to-r from-[#d9d9d9] border-l border-[#FD7B28] to-white transition-transform transform ${
//           isDrawer ? "translate-x-0" : "translate-x-full"
//         } w-80 lg:hidden`}
//       >
//         <button type="button" onClick={() => setIsDrawer(false)} className="absolute top-4 right-4">
//           <RxCross1 className="text-2xl textmain" />
//         </button>

//         <div className="mt-12">
//           <img src="/images/logo/logo2.png" className="h-10 mx-auto" alt="Logo" />
//         </div>

//         <div className="py-6">
//           <ul className="space-y-4 font-medium text-lg">
//             {arr.map((ele, i) => (
//               <li key={i} className="border-b-2">
//                 <Link
//                   href={ele.link}
//                   className={`flex items-center p-3 rounded-lg hover:text-primary-main hover:bg-white ${
//                     path === ele.link ? "bg-primary-main font-medium" : "text-heading-main"
//                   }`}
//                   onClick={() => setIsDrawer(false)}
//                 >
//                   &#9673; <span className="ml-3">{ele.name}</span>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;

