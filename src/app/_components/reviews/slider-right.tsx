import Image from "next/image";
import type { Review } from "./data";

interface SliderRightProps {
  review: Review;
  nextSlide: () => void;
}
const SliderRight: React.FC<SliderRightProps> = ({ review, nextSlide }) => {
  return (
    <figure
      className="col-span-2 relative max-md:hidden cursor-pointer"
      onClick={nextSlide}
      aria-label="Next review"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          nextSlide();
        }
      }}
    >
      <Image
        src={review.image}
        alt="Next"
        width={320}
        height={112}
        className="w-full h-28 object-cover"
      />
      <div className="absolute h-full w-full bg-gradient-to-t from-black to-transparent top-0 left-0" />
      <figcaption className="absolute bottom-0 text-white p-2.5">
        <p className="text-xs poppins">{review.title}</p>
        <p className="text-sm inter">{review.company}</p>
      </figcaption>
    </figure>
  );
};
export default SliderRight;
