import React from "react";
import Navbar from "../_components/navbar";
import Footer from "../_components/footer";

const layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default layout;
