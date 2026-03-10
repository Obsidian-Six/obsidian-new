import Image from "next/image";

export default function Branding() {
  return (
    <section className="branding">
      <figure className="branding__phone-mockup reveal">
        {/* Using the Image component for optimization */}
        <Image 
          src="/images/phone-mockup.png" // Path relative to your 'public' folder
          alt="Phone Mockup" 
          width={800} // Set these to the actual aspect ratio of your image
          height={1600}
          className="w-full h-auto"
          priority // Add priority if this image is high up on the page (LCP)
        />
      </figure>
      
      <figure className="branding__brand reveal">
        <Image 
          src="/images/brand.png" 
          alt="brand logo" 
          width={600} 
          height={400} 
          className="w-full h-auto"
        />
      </figure>
    </section>
  );
}