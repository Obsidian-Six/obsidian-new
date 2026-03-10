
import "./css/banner.css";

const Banner = () => {
  return (
    /* Added 'relative' and 'overflow-hidden' to prevent overlap issues */
    <div className="relative w-full h-[60vh] sm:h-[75vh] md:h-[90vh] lg:h-screen overflow-hidden">
      <div className="area">
        <ul className="circles">
          {[...Array(16)].map((_, i) => (
            <li key={i}></li>
          ))}
        </ul>
      </div>
      
      {/* Optional: Add a dark overlay if your text is hard to read */}
      <div className="absolute inset-0 bg-black/20 z-0" />

      {/* Hero Content (example) */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
        {/* If you have text here, it will now stay inside the banner */}
      </div>
    </div>
  );
};

export default Banner;