"use client";

import { useState } from 'react';
import type { ReactNode, Dispatch, SetStateAction } from 'react';
import Image from 'next/image';

const OverviewPage = () => {
    const services = [
        { id: 1, title: 'UI/UX Design', img: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=500&auto=format&fit=crop&q=60' },
        { id: 2, title: 'Website Design', img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1000' },
        { id: 3, title: 'Mobile Experience', img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000' },
        { id: 4, title: 'Commerce Experience', img: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000' },
        { id: 6, title: 'Applications and Dashboards', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000' },
    ];

    const technologyServices = [
        { id: 0, title: 'DevOps Consulting', img: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=1200' },
        { id: 1, title: 'Data & Analytics', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200' },
        { id: 2, title: 'AI & Machine Learning', img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200' },
        { id: 3, title: 'Web Development', img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200' },
        { id: 4, title: 'Mobile App Development', img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200' },
        { id: 5, title: 'E-commerce', img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200' },
    ];

    const digitalServices = [
        { id: 1, title: 'Social Media Management', img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200' },
        { id: 2, title: 'Performance Marketing', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200' },
        { id: 3, title: 'Search Engine Optimisation', img: 'https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?q=80&w=1200' },
        { id: 4, title: 'Content Marketing', img: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1200' },
        { id: 5, title: 'Marketing Automation', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200' },
        { id: 6, title: 'Analytics', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200' },
    ];

    const brandingServices = [
        { id: 1, title: 'Brand Consulting', img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200' },
        { id: 2, title: 'Logo Design', img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1200' },
        { id: 4, title: 'Graphic Design', img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&auto=format&fit=crop&q=60' },
        { id: 5, title: '2D / 3D Visualisation', img: 'https://plus.unsplash.com/premium_photo-1721165576883-58703467b0cc?w=500&auto=format&fit=crop&q=60' },
        { id: 6, title: 'Brand Identity', img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200' },
        { id: 7, title: 'Industrial Product Design', img: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1200' },
    ];

    const [expHover, setExpHover] = useState(0);
    const [techHover, setTechHover] = useState(0);
    const [digitalHover, setDigitalHover] = useState(0);
    const [brandingHover, setBrandHover] = useState(0);

    // Reusable Component to ensure identical Left Alignment for all sections
    const ServiceSection = ({
        title,
        list,
        hoverIndex,
        setHoverIndex,
        isFlipped = false,
    }: {
        title: ReactNode;
        list: { id: number; title: string; img: string }[];
        hoverIndex: number;
        setHoverIndex: Dispatch<SetStateAction<number>>;
        isFlipped?: boolean;
    }) => (
        <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 bg-white border-b border-gray-50 last:border-0">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                
                {/* Text Content Area */}
                <div className={`lg:col-span-5 flex flex-col items-start ${isFlipped ? 'lg:order-2 lg:col-start-8' : 'lg:order-1'}`}>
                    <h2 className="text-6xl md:text-[72px] font-medium leading-[1.1] mb-16 tracking-tight text-slate-900 text-left w-full">
                        {title}
                    </h2>

                    <nav className="flex flex-col border-t border-gray-100 w-full">
                        {list.map((item, index) => (
                            <button
                                key={item.id}
                                onMouseEnter={() => setHoverIndex(index)}
                                className="group py-6 flex justify-between items-center border-b border-gray-100 text-left transition-all w-full"
                            >
                                <span className={`text-xl font-medium transition-colors duration-300 ${hoverIndex === index ? 'text-black' : 'text-slate-500'}`}>
                                    {item.title}
                                </span>
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Image Display Area */}
                <div className={`lg:col-span-5 sticky top-32 h-fit ${isFlipped ? 'lg:order-1 lg:col-start-1 lg:col-span-6' : 'lg:order-2 lg:col-start-8'}`}>
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50 rounded-sm shadow-sm">
                        {list.map((item, index) => (
                            <div
                                key={item.id}
                                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${hoverIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                            >
                                <Image src={item.img} alt={item.title} fill className="object-cover" />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );

    return (
        <div className="bg-white font-sans text-slate-900">
            {/* HERO */}
            <div className="relative h-[45vh] md:h-[55vh] w-full overflow-hidden flex items-center">
                <Image
                    src="https://plus.unsplash.com/premium_photo-1706569656430-37be43b900e7?q=80&w=1332"
                    alt="Hero"
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <h1 className="text-5xl md:text-8xl font-light text-white tracking-tight">Our Services</h1>
                </div>
            </div>

            <div className="bg-white">
                <ServiceSection 
                    title={<>Experience <br/> Design</>} 
                    list={services} 
                    hoverIndex={expHover} 
                    setHoverIndex={setExpHover} 
                />
                
                <ServiceSection 
                    title="Technology" 
                    list={technologyServices} 
                    hoverIndex={techHover} 
                    setHoverIndex={setTechHover} 
                    isFlipped={true} 
                />
                
                <ServiceSection 
                    title={<>Digital <br/> Marketing</>} 
                    list={digitalServices} 
                    hoverIndex={digitalHover} 
                    setHoverIndex={setDigitalHover} 
                />
                
                <ServiceSection 
                    title="Branding" 
                    list={brandingServices} 
                    hoverIndex={brandingHover} 
                    setHoverIndex={setBrandHover} 
                    isFlipped={true} 
                />
            </div>
        </div>
    );
};

export default OverviewPage;