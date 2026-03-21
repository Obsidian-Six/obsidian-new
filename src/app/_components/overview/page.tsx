"use client";

import { useState } from 'react';
import Image from 'next/image';

const OverviewPage = () => {
    // This is defined as 'services'
    const services = [
        { id: 1, title: 'UI/UX Design', img: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dWl1eHxlbnwwfHwwfHx8MA%3D%3D' },
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
    const Digitalservices = [
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
        { id: 4, title: 'Graphic Design', img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z3JhcGhpYyUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D' },
        { id: 5, title: '2D / 3D Visualisation', img: 'https://plus.unsplash.com/premium_photo-1721165576883-58703467b0cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8MkQlMjAlMkYlMjAzRCUyMFZpc3VhbGlzYXRpb258ZW58MHx8MHx8fDA%3D' },
        { id: 6, title: 'Brand Identity', img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200' },
        { id: 7, title: 'Industrial Product Design', img: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1200' },
    ];

    const [expHover, setExpHover] = useState(0);
    const [techHover, setTechHover] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState(0);
    const [brandingHover, setBrandHover] = useState(0);

    return (
        <div className="bg-white font-sans text-slate-900">
            {/* --- HERO SECTION --- */}
            <div className="relative h-[45vh] md:h-[55vh] w-full overflow-hidden flex items-center">
                <Image
                    src="https://plus.unsplash.com/premium_photo-1706569656430-37be43b900e7?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Hero"
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/40 via-transparent to-orange-500/30 mix-blend-multiply"></div>
                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <h1 className="text-5xl md:text-7xl font-normal text-white tracking-tight">
                        Our Services
                    </h1>
                </div>
            </div>

            <div className="bg-white text-slate-900 overflow-x-hidden">
                {/* --- SECTION 1: EXPERIENCE DESIGN --- */}
                <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-0">
                        {/* Left: Text & List */}
                        <div className="lg:col-span-5">
                            <h2 className="text-6xl md:text-[72px] font-medium leading-[1.05] mb-16 tracking-tight">
                                Experience <br /> Design
                            </h2>
                            <nav className="flex flex-col border-t border-gray-100">
                                {services.map((item, index) => (
                                    <button
                                        key={item.id}
                                        onMouseEnter={() => setExpHover(index)}
                                        className="group py-6 flex justify-between items-center border-b border-gray-100 text-left"
                                    >
                                        <span className="text-xl font-medium text-slate-800 group-hover:text-black transition-colors">
                                            {item.title}
                                        </span>
                                    </button>
                                ))}
                            </nav>

                        </div>

                        {/* Right: Large Image */}
                        <div className="lg:col-start-7 lg:col-span-6 sticky top-32 h-fit">
                            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50 shadow-sm">
                                {/* FIXED: Changed experienceServices to services */}
                                {services.map((item, index) => (
                                    <div key={item.id} className={`absolute inset-0 transition-opacity duration-700 ${expHover === index ? 'opacity-100' : 'opacity-0'}`}>
                                        <Image src={item.img} alt={item.title} fill className="object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- SECTION 2: TECHNOLOGY (FLIPPED) --- */}
                <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-0">
                        {/* Left: Large Image */}
                        <div className="lg:col-span-6 sticky top-32 h-fit order-2 lg:order-1">
                            <div className="relative aspect-[4/3] w-full overflow-hidden bg-purple-50 shadow-sm">
                                {technologyServices.map((item, index) => (
                                    <div key={item.id} className={`absolute inset-0 transition-opacity duration-700 ${techHover === index ? 'opacity-100' : 'opacity-0'}`}>
                                        <Image src={item.img} alt={item.title} fill className="object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Text & List */}
                        <div className="lg:col-start-8 lg:col-span-5 order-1 lg:order-2">
                            <h2 className="text-6xl md:text-[72px] font-medium leading-[1.05] mb-16 tracking-tight">
                                Technology
                            </h2>
                            <nav className="flex flex-col border-t border-gray-100">
                                {technologyServices.map((item, index) => (
                                    <button
                                        key={item.id}
                                        onMouseEnter={() => setTechHover(index)}
                                        className="group py-6 flex justify-between items-center border-b border-gray-100 text-left"
                                    >
                                        <span className="text-xl font-medium text-slate-800 group-hover:text-black transition-colors">
                                            {item.title}
                                        </span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>
                </section>
                <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 bg-white">
                    <div className="grid grid-cols-1 lg:grid-cols-12 items-start">

                        {/* LEFT SIDE: Heading and Interactive List */}
                        <div className="lg:col-span-5 flex flex-col">
                            <h2 className="text-6xl md:text-[72px] font-medium leading-[1.1] mb-16 tracking-tight text-slate-900">
                                Digital <br /> Marketing
                            </h2>

                            <nav className="flex flex-col border-t border-gray-100">
                                {services.map((service, index) => (
                                    <button
                                        key={service.id}
                                        onMouseEnter={() => setHoveredIndex(index)}
                                        className="group py-6 flex justify-between items-center border-b border-gray-100 text-left transition-all"
                                    >
                                        <span className={`text-xl font-medium transition-colors duration-300 ${hoveredIndex === index ? 'text-black' : 'text-slate-700'
                                            }`}>
                                            {service.title}
                                        </span>

                                    </button>
                                ))}
                            </nav>

                        </div>

                        {/* RIGHT SIDE: Dynamic Image Display */}
                        {/* lg:col-start-8 creates the exact empty gap seen in the reference video */}
                        <div className="lg:col-start-8 lg:col-span-5 mt-16 lg:mt-0 sticky top-32">
                            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50 shadow-sm rounded-sm">
                                {Digitalservices.map((service, index) => (
                                    <div
                                        key={service.id}
                                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${hoveredIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                            }`}
                                    >
                                        <Image
                                            src={service.img}
                                            alt={service.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </section>
            
              {/* --- SECTION 2: TECHNOLOGY (FLIPPED) --- */}
                <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-0">
                        {/* Left: Large Image */}
                        <div className="lg:col-span-6 sticky top-32 h-fit order-2 lg:order-1">
                            <div className="relative aspect-[4/3] w-full overflow-hidden bg-purple-50 shadow-sm">
                                {brandingServices.map((item, index) => (
                                    <div key={item.id} className={`absolute inset-0 transition-opacity duration-700 ${brandingHover === index ? 'opacity-100' : 'opacity-0'}`}>
                                        <Image src={item.img} alt={item.title} fill className="object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Text & List */}
                        <div className="lg:col-start-8 lg:col-span-5 order-1 lg:order-2">
                            <h2 className="text-6xl md:text-[72px] font-medium leading-[1.05] mb-16 tracking-tight">
                                Branding
                            </h2>
                            <nav className="flex flex-col border-t border-gray-100">
                                {brandingServices.map((item, index) => (
                                    <button
                                        key={item.id}
                                        onMouseEnter={() => setBrandHover(index)}
                                        className="group py-6 flex justify-between items-center border-b border-gray-100 text-left"
                                    >
                                        <span className="text-xl font-medium text-slate-800 group-hover:text-black transition-colors">
                                            {item.title}
                                        </span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default OverviewPage;