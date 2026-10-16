
"use client";

import Image from "next/image";
import Button from "./common/Button";

export default function MeetTheFounder() {
  return (
    <section
      id="meet-the-founder"
      className="bg-white px-5 py-16 text-[#171717] sm:px-8 sm:py-20 lg:px-12 lg:py-28 overflow-hidden"
    >
      <div className="mx-auto px-4 grid max-w-7xl grid-cols-1 items-center gap-10 sm:gap-12 md:grid-cols-2 md:gap-10 lg:gap-20">
        {/* Left: Content */}
        <div className="order-2 md:order-1">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-[#052D69]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#052D69] sm:text-xs">
              The person behind Obsidian Six
            </span>
          </div>

          <h2 className="max-w-xl text-4xl font-medium leading-[1.05] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
            Hi, I&apos;m{" "}
            <span className="text-[#052D69]">Aadarsh.</span>
          </h2>

          <div className="mt-7 max-w-xl space-y-5 text-sm leading-7 text-gray-600 sm:mt-8 sm:text-base sm:leading-8">
            <p>
              I started Obsidian Six to help brands turn ads, websites and
              content into steady customers.
            </p>

            <p>
              Over seven years, I&apos;ve worked with brands across
              e-commerce, hospitality, wellness, real estate and finance.
              Every business is different, but the goal is the same:
              marketing that delivers meaningful results.
            </p>

            <p>
              Today, our team of 10–15 works on your account every day.
              And unlike agencies where you&apos;re passed between layers
              of management, you can speak to me directly.
            </p>
          </div>

          {/* Personal note placeholder */}
          <p className="mt-6 border-l-2 border-[#052D69] pl-4 text-sm italic leading-7 text-gray-500">
            [A personal note from Aadarsh about why he started the agency.]
          </p>

          {/* CTA */}
          <div className="mt-8 sm:mt-10">
            <Button
            hlink={"/aboutus"}
            text="Read more about us"
            textColor="white"
            borderColor="white"
            hoverBgColor=""
            hoverTextColor="hover:text-white"
          />
            
          </div>
        </div>

        {/* Right: Founder image */}
        <div className="order-1 md:order-2">
          <div className="relative mx-auto w-full max-w-[450px] overflow-hidden bg-[#F3F5F8]">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="/founder.jpeg"
                alt="Aadarsh, founder of Obsidian Six"
                fill
                priority={false}
                sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 540px"
                className="object-cover object-center transition-transform duration-700 ease-out hover:scale-[1.02]"
              />
            </div>

            {/* Image caption */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent px-5 pb-5 pt-20 sm:px-7 sm:pb-7">
              <p className="text-lg font-medium text-white sm:text-xl">
                Aadarsh
              </p>

              <p className="mt-1 text-xs tracking-wide text-white/75 sm:text-sm">
                Founder, Obsidian Six
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
