import Image from "next/image";
import clientLogos from "./data";

export default async function OurClients() {
  return (
    <section id="ourClients" className="bg-black py-20 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center mb-20">
        <h2 className="text-5xl md:text-6xl text-white font-light mb-7 md:mb-0 md:text-left w-full md:w-1/2 tracking-wide">
          Clients
        </h2>
        <p className="text-lg md:text-xl text-white font-light md:text-right w-full md:w-1/2">
          Our clients are everything to us; so are we to them.
        </p>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-14 gap-x-10">
        {clientLogos.map((logo, index) => (
          <figure
            key={index}
            className="flex items-center justify-center relative"
          >
            <Image
              src={logo.url}
              alt={`client-logo-${index}`}
              width={160}
              height={64}
              className="max-h-16 object-contain transition-all duration-300 filter brightness-0 invert hover:filter-none"
            />
            <figcaption className="invisible absolute top-0 left-[-9999px]">
              {logo.name}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
