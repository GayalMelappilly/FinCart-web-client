import { Compass, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Hero = () => {
    return (
        <section className="relative min-h-screen bg-slate-50 md:px-10">
            {/* Decorative water-like background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-64 bg-blue-500/5 rounded-full blur-3xl transform -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-full h-64 bg-cyan-500/5 rounded-full blur-3xl transform translate-y-1/2"></div>
            </div>

            <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
                {/* Main content grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

                    {/* Left column: Information and call-to-action */}
                    <div className="lg:col-span-5 space-y-8">
                        {/* Main heading with fancy underline */}
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight">
                            Discover the
                            <span className="relative mx-2">
                                <span className="relative z-10 border-b-4 border-cyan-300/80">Artistry</span>
                                <span className="absolute bottom-1 left-0 w-full h-3 transform -rotate-1"></span>
                            </span>
                            of Ornamental Fish
                        </h1>

                        {/* Description */}
                        <p className="text-slate-600 text-sm md:text-lg">
                            Bring vibrant colors and graceful movement into your home with our
                            expertly curated selection of rare and exotic ornamental fish.
                        </p>

                        {/* Interactive elements grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 w-3/4 md:w-full">
                            <button className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-800 hover:scale-105 duration-300 text-white text-sm md:text-base py-2 md:py-4 px-6 rounded-lg font-medium transition-all shadow-md hover:shadow-lg group">
                                <span>Browse Collection</span>
                                <Compass size={18} className="transition-transform" />
                            </button>

                            <Link href={'/seller/dashboard'} className="flex items-center justify-center space-x-2 bg-zinc-200 hover:bg-blue-300/40 font-bold hover:scale-105 duration-300 text-slate-800 text-sm md:text-base py-2 md:py-4 px-6 rounded-lg border border-slate-200 transition-all">
                                <span>Sell Your Fish</span>
                                <ShoppingBag size={18} />
                            </Link>
                        </div>
                    </div>

                    {/* Right column: Showcase images in gallery layout */}
                    <div className="lg:col-span-7">
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                            {/* Main large image - changes to full width on mobile */}
                            <div className="sm:col-span-8 sm:row-span-2 relative rounded-2xl overflow-hidden shadow-xl border border-white/20 aspect-square sm:aspect-[4/3]">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-400/20"></div>
                                <Image
                                    src={'/hero.jpeg'}
                                    alt='hero-image'
                                    className="w-full h-full object-cover"
                                    width={1000}
                                    height={1000}
                                />
                            </div>

                            {/* Smaller gallery images - stack vertically on mobile */}
                            <div className="sm:col-span-4 relative rounded-2xl overflow-hidden shadow-lg border border-white/20 aspect-square sm:aspect-auto">
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-400/10"></div>
                                <Image
                                    src={'/hero-betta.jpeg'}
                                    alt='hero-image'
                                    className="w-full h-full object-cover"
                                    width={1000}
                                    height={1000}
                                />
                            </div>

                            <div className="sm:col-span-4 relative rounded-2xl overflow-hidden shadow-lg border border-white/20 aspect-square sm:aspect-auto">
                                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-cyan-400/10"></div>
                                <Image
                                    src={'/hero-tetra.jpeg'}
                                    alt='hero-image'
                                    className="w-full h-full object-cover"
                                    width={1000}
                                    height={1000}
                                />
                            </div>

                            {/* Feature cards - full width on mobile, adjusted positioning */}
                            <div className="col-span-12 sm:col-span-8 sm:-mt-20 -mt-10 z-10 mx-auto px-4 sm:px-0">
                                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-5 border border-slate-100">
                                    <div className="grid grid-cols-3 divide-x divide-slate-200">
                                        {[
                                            { title: "200+", subtitle: "Species" },
                                            { title: "Worldwide", subtitle: "Shipping" },
                                            { title: "Expert", subtitle: "Support" }
                                        ].map((item, i) => (
                                            <div key={i} className="px-2 sm:px-4 text-center">
                                                <h3 className="text-base sm:text-lg font-bold text-blue-600">{item.title}</h3>
                                                <p className="text-xs sm:text-sm text-slate-600">{item.subtitle}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Subtle wave decoration at bottom */}
                <div className="bottom-0 left-0 w-full h-16 opacity-10">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
                        <path fill="#0099ff" fillOpacity="1" d="M0,96L48,128C96,160,192,224,288,229.3C384,235,480,181,576,165.3C672,149,768,171,864,181.3C960,192,1056,192,1152,165.3C1248,139,1344,85,1392,58.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>
            </div>
        </section>
    )
}

export default Hero