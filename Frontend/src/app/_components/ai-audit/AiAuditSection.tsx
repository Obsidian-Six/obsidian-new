import Button from "../common/Button";
import AIOrb from "./AIOrb";

export default function AuditHero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      
      {/* Orb */}
      <div className="absolute inset-0">
        <AIOrb
          hue={0}
          hoverIntensity={0.5}
          rotateOnHover={true}
          backgroundColor="#000000"
          className="h-full w-full"
        />
      </div>

      {/* Dark overlay */}
      <div className="pointer-events-none absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6  pointer-events-none">
        <div className="max-w-175 text-center">

          <span className="mb-6 block text-[10px] uppercase tracking-[0.3em] text-white/40">
            AI Marketing Intelligence
          </span>

          <h1 className="text-[48px] font-normal leading-[0.95] tracking-[-0.06em] text-white sm:text-[64px] md:text-[82px]">
            Discover what&apos;s
            <br />
            <span className="text-white/40">
              holding you back.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-120 text-sm leading-7 text-white/45">
            Answer 11 focused questions and let our AI
            uncover the marketing opportunities hidden
            inside your UAE business.
          </p>

      
          <Button hlink="/uae-ai-marketing-audit.html" text="Start Free Audit" bgColor=""  className="
              mt-8
              border
              border-white
              px-7
              py-4
              text-sm
              text-white
              backdrop-blur-xl
              transition-all
              duration-300
              hover:border-white
              pointer-events-auto
            " />

        </div>
      </div>
    </section>
  );
}