"use client";

import { useEffect } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";

const ParticleSnow = () => {
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    });
  }, []);

  const particlesLoaded = async (_container?: any): Promise<void> => {};

  return (
    <div>
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={{
          fpsLimit: 100,
          interactivity: {
            events: {
              onClick: { enable: false, mode: "push" },
              onHover: { enable: true, mode: "grab" },
              resize: { enable: true },
            },
            modes: {
              push: { quantity: 4 },
              repulse: { distance: 100, duration: 0.4 },
              grab: { distance: 200 },
            },
          },
          particles: {
            color: { value: "#ffffff" },
            links: { color: "#ffffff" },
            number: { value: 100 },
            shape: { type: "circle" },
            opacity: { value: 0.7 },
            size: { value: { min: 2, max: 5 } },
            move: {
              enable: true,
              speed: 1,
              direction: "bottom",
              outModes: { default: "out" },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
};

export default ParticleSnow;
