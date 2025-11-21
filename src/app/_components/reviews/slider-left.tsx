"use client";

import Image from "next/image";
import type { Review } from "./data";

interface SliderLeftProps {
  review: Review;
  prevSlide: () => void;
}

const SliderLeft: React.FC<SliderLeftProps> = ({ review, prevSlide }) => {
  return (
    <figure
      className="col-span-2 relative max-md:hidden cursor-pointer"
      onClick={prevSlide}
      aria-label="Previous review"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          prevSlide();
        }
      }}
    >
      <Image
        src={review.image}
        alt={review.title || "Previous"}
        width={320}
        height={112}
        className="w-full h-28 object-cover"
        priority={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
      <figcaption className="absolute bottom-0 text-white p-2.5">
        <p className="text-xs poppins">{review.title}</p>
        <p className="text-sm inter">{review.company}</p>
      </figcaption>
    </figure>
  );
};

export default SliderLeft;
