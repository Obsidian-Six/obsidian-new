"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";

const ParticleSnow = () => {
    const [init2, setInit2] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadFull(engine);
        }).then(() => {
            setInit2(true);
        });
    }, []);

    const particlesLoaded = (container) => {
        console.log(container);
    };

    return (
        <div>
            <Particles
                id="tsparticles"
                particlesLoaded={particlesLoaded}
                options={{
                    fpsLimit: 100,
                    interactivity: {
                        events: {
                            onClick: {
                                enable: false,
                                mode: "push",
                            },
                            onHover: {
                                enable: true,
                                mode: "grab",
                            },
                            resize: true,
                        },
                        modes: {
                            push: {
                                quantity: 4,
                            },
                            repulse: {
                                distance: 100,
                                duration: 0.4,
                            },
                            grab: {
                                distance: 200,
                            },
                        },
                    },
                    particles: {
                        color: {
                            value: "#FD7B28",
                        },
                        links: {
                            color: "#FD7B28",
                         
                        },
                        number: {
                            value: 100,
                        },
                        shape: {
                            type: "circle",
                        },
                        opacity: {
                            value: 0.7,
                        },
                        size: {
                            value: { min: 2, max: 5 }, // Adjust size for better visibility
                        },
                        move: {
                            enable: true,
                            speed: 1,
                            direction: "bottom",
                            outModes: {
                                default: "out",
                            },
                        },
                        color: {
                            value: ["#FD7B28"], // White, Light Blue, Sky Blue
                        },
                    },
                    detectRetina: true,
                }}
            />
        </div>
    );
};

export default ParticleSnow;
