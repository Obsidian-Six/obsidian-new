import { Poppins , Londrina_Outline} from "next/font/google";

// If loading a variable font, you don't need to specify the font weight

  export const poppins = Poppins({
    subsets: ["latin"],
    // display: "swap",
    weight:['300','400','500','600','700']
  });

  export const playfair = Londrina_Outline({
    subsets: ["latin"],
    weight:['400']
  });
    