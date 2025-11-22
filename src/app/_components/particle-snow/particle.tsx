"use client";

import { useEffect } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";

const Particle = () => {
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    });
  }, []);

  const particlesLoaded = async (_container?: any): Promise<void> => {};

  const options: any = {
    fpsLimit: 100,
    interactivity: {
      events: {
        onClick: { enable: false, mode: "push" },
        onHover: { enable: true, mode: "grab" },
        resize: { enable: true },
      },
      modes: {
        push: { quantity: 10 },
        repulse: { distance: 200, duration: 0.4 },
        grab: { distance: 300 },
      },
    },
    particles: {
      color: { value: "#FD7B28" },
      links: {
        color: "#FD7B28",
        distance: 300,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: { default: "bounce" },
        random: false,
        speed: 5,
        straight: false,
      },
      number: { density: { enable: true, area: 800 }, value: 90 },
      opacity: { value: 0.5 },
      shape: { type: "circle" },
      size: { value: { min: 2, max: 3 } },
    },
    detectRetina: true,
  };

  return (
    <div>
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    </div>
  );
};

export default Particle;
